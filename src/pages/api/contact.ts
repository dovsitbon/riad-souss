import type { APIRoute } from 'astro';

export const prerender = false;

const MAX = { nom: 100, email: 160, telephone: 30, message: 3000, date: 10, personnes: 3 } as const;
const SUJETS: Record<string, string> = { question: 'Question', groupe: 'Demande de groupe', autre: 'Autre' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Limite simple par instance (meilleur effort en serverless) : 5 envois / 10 min / IP.
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

function reply(request: Request, status: number, body: Record<string, unknown>) {
  const wantsJson = (request.headers.get('accept') ?? '').includes('application/json');
  if (wantsJson) {
    return new Response(JSON.stringify(body), {
      status,
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
    });
  }
  // Mode sans JavaScript : succès → retour sur la page contact ; erreur → page explicative.
  if (status < 300) return new Response(null, { status: 303, headers: { Location: '/contact?envoye=1' } });
  const details = body.fields ? Object.values(body.fields as Record<string, string>) : [];
  const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Message non envoyé · Riad Souss</title>
<style>body{font-family:Arial,sans-serif;background:#f5efe6;color:#2b201a;max-width:560px;margin:4rem auto;padding:0 1rem;line-height:1.6}a{color:#9e3b22;font-weight:700}</style></head>
<body><h1>Votre message n'a pas été envoyé</h1><p>${escape(String(body.message ?? ''))}</p>${details.length ? `<ul>${details.map((d) => `<li>${escape(d)}</li>`).join('')}</ul>` : ''}
<p><a href="/contact">Revenir au formulaire</a> · <a href="tel:+33139831359">Appeler le 01 39 83 13 59</a></p></body></html>`;
  return new Response(html, { status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } });
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  // Refus des requêtes provenant d'une autre origine.
  const origin = request.headers.get('origin');
  if (origin && new URL(origin).host !== new URL(request.url).host) {
    return reply(request, 403, { ok: false, message: 'Origine non autorisée.' });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return reply(request, 400, { ok: false, message: 'Requête invalide.' });
  }

  const get = (k: keyof typeof MAX) => String(form.get(k) ?? '').trim().slice(0, MAX[k]);
  const data = {
    sujet: SUJETS[String(form.get('sujet'))] ?? 'Question',
    nom: get('nom'),
    email: get('email'),
    telephone: get('telephone'),
    date: get('date'),
    personnes: get('personnes'),
    message: get('message'),
  };

  // Pot de miel anti-robots : on fait comme si tout allait bien.
  if (String(form.get('website') ?? '')) {
    return reply(request, 200, { ok: true, message: 'Merci, votre message a bien été envoyé.' });
  }

  const fields: Record<string, string> = {};
  if (!data.nom) fields.nom = 'Indiquez votre nom.';
  if (!EMAIL_RE.test(data.email)) fields.email = 'Adresse e-mail invalide.';
  if (data.telephone && !/^[+()\d\s.-]{6,30}$/.test(data.telephone)) fields.telephone = 'Numéro invalide.';
  if (data.message.length < 10) fields.message = 'Message trop court (10 caractères minimum).';
  if (data.personnes && !/^\d{1,3}$/.test(data.personnes)) fields.personnes = 'Nombre invalide.';
  if (data.date && !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) fields.date = 'Date invalide.';
  if (form.get('consent') !== 'oui') fields.consent = 'Le consentement est nécessaire pour vous répondre.';
  if (Object.keys(fields).length) {
    return reply(request, 422, { ok: false, message: 'Certains champs sont à corriger.', fields });
  }

  if (rateLimited(clientAddress ?? 'unknown')) {
    return reply(request, 429, { ok: false, message: 'Trop de messages envoyés. Réessayez plus tard ou appelez le 01 39 83 13 59.' });
  }

  const apiKey = import.meta.env.RESEND_API_KEY ?? process.env.RESEND_API_KEY;
  const to = import.meta.env.CONTACT_TO ?? process.env.CONTACT_TO;
  const from = import.meta.env.CONTACT_FROM ?? process.env.CONTACT_FROM;
  if (!apiKey || !to || !from) {
    // Pas de faux succès : on dit clairement que l'envoi en ligne n'est pas encore actif.
    return reply(request, 503, {
      ok: false,
      message:
        "L'envoi en ligne n'est pas encore activé. Merci d'appeler le restaurant au 01 39 83 13 59 ou de réserver sur TheFork.",
    });
  }

  const rows = [
    ['Objet', data.sujet],
    ['Nom', data.nom],
    ['E-mail', data.email],
    ['Téléphone', data.telephone || '—'],
    ...(data.sujet === 'Demande de groupe'
      ? [['Date souhaitée', data.date || '—'], ['Personnes', data.personnes || '—']]
      : []),
  ];
  const html = `
    <h2>Nouveau message depuis le site Riad Souss</h2>
    <table cellpadding="6">${rows.map(([k, v]) => `<tr><th align="left">${k}</th><td>${escape(v)}</td></tr>`).join('')}</table>
    <p style="white-space:pre-wrap">${escape(data.message)}</p>`;
  const text = `${rows.map(([k, v]) => `${k} : ${v}`).join('\n')}\n\n${data.message}`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: to.split(',').map((s: string) => s.trim()),
        reply_to: data.email,
        subject: `[Site] ${data.sujet} – ${data.nom}`,
        html,
        text,
      }),
    });
    if (!res.ok) throw new Error(`Resend ${res.status}`);
  } catch (err) {
    console.error('contact: envoi impossible', err);
    return reply(request, 502, {
      ok: false,
      message: "L'envoi a échoué. Réessayez plus tard ou appelez le restaurant au 01 39 83 13 59.",
    });
  }

  return reply(request, 200, { ok: true, message: 'Merci, votre message a bien été envoyé. Le restaurant vous répondra rapidement.' });
};

export const ALL: APIRoute = () =>
  new Response(JSON.stringify({ ok: false, message: 'Méthode non autorisée.' }), {
    status: 405,
    headers: { Allow: 'POST', 'Content-Type': 'application/json' },
  });
