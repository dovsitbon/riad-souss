/**
 * Source unique des informations du restaurant.
 * Toutes les données ci-dessous ont été relevées le 19 octobre 2026 sur des sources publiques
 * (voir SOURCES.md). Rien n'est inventé : ce qui n'a pas pu être confirmé n'apparaît pas
 * ou est explicitement signalé.
 */

export const RELEVE = '19 octobre 2026';

export const business = {
  name: 'Riad Souss',
  tagline: 'Restaurant marocain à Groslay',
  // Bio Instagram officielle : « Spécialité 100% marocaine »
  specialite: 'Spécialité 100 % marocaine',
  phoneDisplay: '01 39 83 13 59',
  phoneHref: 'tel:+33139831359',
  phoneE164: '+33139831359',
  address: {
    street: '120 rue du Général Leclerc',
    postalCode: '95410',
    city: 'Groslay',
    region: "Val-d'Oise",
    country: 'FR',
  },
  geo: { lat: 48.9852761, lng: 2.3539245 },
  priceRange: '20–30 €',
  averagePrice: '30 €', // prix moyen indiqué sur TheFork (entrée + plat ou plat + dessert, hors boissons)
  cuisine: 'Marocaine',
  links: {
    googleMaps: 'https://maps.app.goo.gl/QNS6gYN9pzjGQt5o9',
    directions:
      'https://www.google.com/maps/dir/?api=1&destination=Riad+Souss%2C+120+Rue+du+G%C3%A9n%C3%A9ral+Leclerc%2C+95410+Groslay',
    theFork: 'https://www.thefork.fr/restaurant/riad-souss-r338569',
    instagram: 'https://www.instagram.com/restaurant_riad_souss/',
    tripadvisor:
      'https://www.tripadvisor.fr/Restaurant_Review-g4545874-d11785087-Reviews-Riad_Souss-Groslay_Val_d_Oise_Ile_de_France.html',
  },
  legal: {
    company: 'MAYIF',
    form: 'SAS',
    siren: '803 613 694',
    siret: '803 613 694 00022',
    naf: '56.10A – Restauration traditionnelle',
    president: 'Mostapha Chteoui',
  },
  access: {
    train: 'Gare de Groslay (Transilien ligne H) à environ 100 m',
    pmr: 'Entrée et places assises accessibles en fauteuil roulant',
  },
} as const;

/** 0 = dimanche … 6 = samedi (convention JS Date.getDay()). Source : fiche Google. */
export type Slot = [string, string];
export const hours: { day: number; label: string; slots: Slot[] }[] = [
  { day: 1, label: 'Lundi', slots: [] },
  { day: 2, label: 'Mardi', slots: [['12:00', '14:30'], ['19:00', '22:30']] },
  { day: 3, label: 'Mercredi', slots: [['12:00', '14:30'], ['19:00', '22:30']] },
  { day: 4, label: 'Jeudi', slots: [['12:00', '14:30'], ['19:00', '22:30']] },
  { day: 5, label: 'Vendredi', slots: [['12:00', '14:30'], ['19:00', '22:30']] },
  { day: 6, label: 'Samedi', slots: [['12:00', '14:30'], ['19:00', '22:30']] },
  { day: 0, label: 'Dimanche', slots: [['12:00', '14:30'], ['19:00', '22:30']] },
];

/**
 * Carte publiée sur TheFork par le restaurant (dernière mise à jour indiquée : 13 août 2020).
 * Prix reproduits tels quels ; ils peuvent avoir évolué.
 */
export const MENU_UPDATED = '13 août 2020';
export const menu = [
  {
    id: 'entrees',
    title: 'Entrées',
    items: [
      { name: 'Pastilla au poulet', price: 10 },
      { name: 'Salade marocaine', price: 6 },
      { name: 'Driouates poulet, crevettes', price: 6.5 },
    ],
  },
  {
    id: 'plats',
    title: 'Plats',
    items: [
      { name: 'Tajin aux prunes et amandes', price: 16 },
      { name: 'Couscous mishoui', price: 19 },
      { name: 'Grillades', price: 17 },
    ],
  },
  {
    id: 'desserts',
    title: 'Desserts',
    items: [
      { name: 'Pâtisseries marocaines (6 pièces)', price: 6 },
      { name: 'Glace au choix', price: 4.5 },
      { name: "Salade d'orange à la marocaine, cannelle et fleur d'oranger", price: 6 },
    ],
  },
  {
    id: 'boissons',
    title: 'Boissons',
    items: [
      { name: "Bouteille d'eau", price: 5 },
      { name: "Demi-bouteille d'eau", price: 4 },
      { name: 'Café', price: 2.5 },
    ],
  },
] as const;

/** Plats cités à plusieurs reprises dans les avis publics (Google, TheFork) — sans prix publié. */
export const citedDishes = [
  'Couscous royal',
  'Tajine de boulettes kefta aux œufs',
  "Tajine d'agneau",
  'Pastilla',
  'Thé à la menthe',
  'Pâtisseries marocaines',
];

/** Notes publiques relevées le 19/10/2026. */
export const ratings = [
  { source: 'Google', score: '4,6', scale: '/5', count: 373, url: business.links.googleMaps },
  { source: 'TheFork', score: '9,4', scale: '/10', count: 426, url: business.links.theFork },
];

/** Thèmes récurrents des avis publics (synthèse, pas de citation inventée). */
export const reviewThemes = [
  {
    title: 'Un accueil chaleureux',
    text: "Le service est la note la plus haute sur TheFork (9,6/10). Les clients décrivent un personnel souriant, attentionné et professionnel.",
  },
  {
    title: 'Le couscous et les tajines',
    text: "Ce sont les plats les plus cités. Les clients parlent d'assiettes copieuses et chaudes, et de viande d'agneau tendre.",
  },
  {
    title: 'Le thé et les pâtisseries',
    text: 'Le thé à la menthe et les pâtisseries marocaines reviennent souvent en fin de repas.',
  },
  {
    title: 'Un bon rapport qualité-prix',
    text: "Les avis TheFork soulignent un prix juste pour la région parisienne, autour de 30 € le repas.",
  },
];

/** Photos d'illustration — Unsplash (licence Unsplash, usage commercial autorisé). NON représentatives du restaurant. */
const u = (id: string) => `https://images.unsplash.com/${id}`;
export const photos = {
  hero: { src: u('photo-1541518763669-27fef04b14ea'), alt: 'Plat marocain mijoté aux légumes dans une assiette en céramique décorée', page: 'https://unsplash.com/photos/k2ZCm7LCj8E' },
  couscous: { src: u('photo-1742806418170-f051cb880314'), alt: 'Couscous aux légumes servi dans un plat en terre cuite', page: 'https://unsplash.com/photos/0TJqrLinYY4' },
  couscous2: { src: u('photo-1749993086443-93a5a88eb4c2'), alt: 'Couscous garni de viande et de raisins secs', page: 'https://unsplash.com/photos/Bi_hJh5oEtA' },
  tajine: { src: u('photo-1682370207954-c8a9cccaabb4'), alt: 'Tajine fumant accompagné de légumes', page: 'https://unsplash.com/photos/d5vo4XDOgfs' },
  tajine2: { src: u('photo-1643019237176-8ae0859f1123'), alt: 'Tajine vu de dessus sur une table en mosaïque', page: 'https://unsplash.com/photos/q11NM0cFFzY' },
  grill: { src: u('photo-1643019237376-ef702ddfe654'), alt: 'Plateau de viandes grillées et de légumes', page: 'https://unsplash.com/photos/OrXpKuMqoAI' },
  the: { src: u('photo-1591299089616-c9604047b1a6'), alt: 'Thé à la menthe versé dans des verres', page: 'https://unsplash.com/photos/Bmek6EYG9Uk' },
  patisseries: { src: u('photo-1784386124506-617d0bec2e02'), alt: 'Plateau de pâtisseries orientales', page: 'https://unsplash.com/photos/zNwEeU0AOaM' },
  patisseries2: { src: u('photo-1574810134700-b6ba48d151a0'), alt: 'Pâtisseries posées à côté d’une théière', page: 'https://unsplash.com/photos/VBW7PlDhzWU' },
  lanterne: { src: u('photo-1779599790541-2f50889661ed'), alt: 'Lanterne marocaine en métal ciselé allumée', page: 'https://unsplash.com/photos/bAg-p3i2Xbk' },
  epices: { src: u('photo-1580746738099-1cb74f972feb'), alt: "Paniers d'épices sur un étal de marché", page: 'https://unsplash.com/photos/Dql2_LN5sRg' },
} as const;

export type Photo = (typeof photos)[keyof typeof photos];

export function img(p: Photo, w: number, h?: number) {
  return `${p.src}?auto=format&fit=crop&q=70&w=${w}${h ? `&h=${h}` : ''}`;
}

export function srcset(p: Photo, widths: number[], ratio?: number) {
  return widths.map((w) => `${img(p, w, ratio ? Math.round(w * ratio) : undefined)} ${w}w`).join(', ');
}

export const euro = (n: number) =>
  n.toLocaleString('fr-FR', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }) + ' €';
