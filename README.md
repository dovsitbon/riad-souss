# Riad Souss — site web

Site vitrine du restaurant marocain **Riad Souss**, 120 rue du Général Leclerc, 95410 Groslay.
Les sources de toutes les informations sont listées dans [SOURCES.md](SOURCES.md).

## Stack

- [Astro 6](https://astro.build), pages statiques et une route serveur (`/api/contact`)
- Adaptateur `@astrojs/vercel` (fonction serverless pour le formulaire)
- Polices auto-hébergées (Fraunces, Karla) : aucune requête vers Google Fonts
- Aucune dépendance JavaScript côté client : quelques scripts natifs (menu, statut « ouvert maintenant », formulaire)

> Astro 7 n'est pas utilisé : son compilateur natif est bloqué sur ce poste Windows par la politique de contrôle des applications (erreur 4551).

## Lancer le projet

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # génère dist/ et .vercel/output
```

## Pages

| URL | Contenu |
|---|---|
| `/` | Accueil : proposition de valeur, notes, plats phares, avis, groupes, galerie, horaires, carte |
| `/carte` | Carte et prix publiés (avec date de mise à jour), plats cités par les clients |
| `/groupes` | Repas de groupe, déroulé, demande de devis |
| `/infos-pratiques` | Horaires, accès, carte OpenStreetMap, FAQ |
| `/contact` | Téléphone, TheFork, Instagram, formulaire |
| `/mentions-legales`, `/confidentialite` | Pages légales (éléments manquants signalés « À compléter ») |

SEO : balises title et description par page, canonical, Open Graph, `sitemap-index.xml`, `robots.txt`, `llms.txt`.
Données structurées JSON-LD : `Restaurant` (horaires, géolocalisation, accessibilité), `Menu`, `FAQPage` et `BreadcrumbList`.

## Formulaire de contact

La route `/api/contact` valide les champs, filtre les robots (pot de miel, contrôle d'origine, limite de débit) et envoie l'e-mail via [Resend](https://resend.com).
**Tant que les variables ci-dessous ne sont pas définies, le formulaire répond honnêtement que l'envoi en ligne n'est pas activé** et invite à appeler. Aucun faux succès n'est affiché.

Dans Vercel → Project → Settings → Environment Variables :

```
RESEND_API_KEY=re_xxx
CONTACT_TO=adresse-du-restaurant@exemple.fr
CONTACT_FROM=Site Riad Souss <site@domaine-verifie.fr>
```

Les secrets ne sont lus que côté serveur. `.env*` et `.vercel/` sont ignorés par git.

## Mise en ligne

Le dépôt GitHub est relié à Vercel : chaque `git push` sur `main` redéploie la production.
Domaine personnalisé : Vercel → Settings → Domains. Mettre ensuite à jour `SITE_URL` dans `astro.config.mjs`, `public/robots.txt` et `public/llms.txt`.

## Avant de présenter au restaurateur

Voir la section « À demander au restaurateur » de [SOURCES.md](SOURCES.md). En priorité : les photos officielles, la carte à jour et l'e-mail de contact.
