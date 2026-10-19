# Sources et vérification des informations — Riad Souss

Recherche effectuée le **19 octobre 2026**. Point de départ : le lien Google Maps fourni,
`https://maps.app.goo.gl/QNS6gYN9pzjGQt5o9`, qui redirige vers la fiche
« Riad Souss, 120 Rue du Général Leclerc, 95410 Groslay » (identifiant `0x47e669a292615555:0x40782f2014bc73a3`).

## Informations confirmées (utilisées sur le site)

| Information | Valeur | Sources |
|---|---|---|
| Nom commercial | Riad Souss | Google Maps, TheFork, Instagram, annuaire des entreprises |
| Adresse | 120 rue du Général Leclerc, 95410 Groslay | Google Maps, TheFork, Instagram, Mappy, INSEE |
| Téléphone | 01 39 83 13 59 | Google Maps, Instagram (bio), Eat-List, RestaurantGuru |
| Coordonnées GPS | 48.9852761, 2.3539245 | Google Maps |
| Activité | Restaurant marocain | Google Maps, TheFork |
| Horaires | Mar.–dim. 12:00–14:30 et 19:00–22:30, fermé le lundi | Google Maps (RestaurantGuru donne les mêmes horaires) |
| Réservation en ligne | TheFork | Google Maps (bouton « Réserver une table » vers thefork.fr), TheFork |
| Prix moyen | 30 € | TheFork (« prix fournis par le restaurant ») |
| Carte et prix | 12 articles, voir `src/data/site.ts` | TheFork, onglet Menu (**dernière mise à jour : 13 août 2020**) |
| Halal | Oui | TheFork, « Choix alimentaires » |
| Accessibilité | Entrée et places assises accessibles en fauteuil roulant | Google Maps, onglet « À propos » |
| Note Google | 4,6/5, 373 avis | Google Maps |
| Note TheFork | 9,4/10, 426 avis (plats 9,3, service 9,6, ambiance 9,4) | TheFork |
| Instagram officiel | @restaurant_riad_souss | Instagram : la bio reprend l'adresse et le téléphone, d'où l'identification comme compte officiel |
| Entreprise | MAYIF SAS, SIREN 803 613 694, SIRET 803 613 694 00022, NAF 56.10A, président : Mostapha Chteoui | recherche-entreprises.api.gouv.fr |
| Gare la plus proche | Gare de Groslay (Transilien H), à environ 80–100 m | OpenStreetMap / Nominatim |

## Informations incertaines (non affichées, ou affichées avec réserve)

- **Horaires TheFork** : 12:00–15:00 et 19:00–23:00. Ce sont probablement les créneaux de réservation. Le site affiche les horaires de Google.
- **Vente à emporter** : indiquée par Eat-List et RestaurantGuru, avec un « highlight » Uber Eats sur Instagram. Le site l'évoque seulement dans la FAQ, avec un renvoi au téléphone.
- **Livraison / Uber Eats** : aucune page Uber Eats active trouvée. Non affichée.
- **Moyens de paiement** (espèces, CB, tickets restaurant) : une seule source (Eat-List). Non affichés.
- **Facebook** : RestaurantGuru et Sluurpy mentionnent une page, mais elle n'a pas pu être vérifiée. Aucun lien n'est affiché.
- **TikTok** : aucun compte trouvé.
- **Site web existant** : aucun. La fiche Google propose « Ajouter un site Web ».
- **Note Tripadvisor** : 84 avis selon TheFork. La page Tripadvisor bloque la lecture automatique, donc aucune note n'est affichée (lien seulement, dans les données structurées).
- **Plats cités dans les avis** (couscous royal, tajine kefta aux œufs, pastilla, thé, pâtisseries) : affichés dans une rubrique séparée, sans prix.

## À demander au restaurateur

1. Carte et prix actuels (la carte en ligne date de 2020).
2. Photos officielles (salle, façade, plats) avec autorisation d'utilisation.
3. Adresse e-mail de contact, puis activation du formulaire (voir README).
4. Capital social, ville du RCS et n° de TVA pour les mentions légales.
5. Capacité de la salle, formules de groupe, privatisation.
6. Vente à emporter, livraison, moyens de paiement, terrasse.
7. Lien Facebook officiel, s'il existe.
8. Histoire de la maison (date d'ouverture, chef, origine « Souss »). Rien n'a été inventé à ce sujet.

## Photos

Aucune photo du restaurant n'est utilisée : les photos de la fiche Google et de TheFork n'ont pas de licence de réutilisation.
Toutes les images viennent d'**Unsplash** (licence Unsplash, usage commercial autorisé) et portent sur le site la mention « Photo d'illustration ».
Les liens vers chaque photo se trouvent dans `src/data/site.ts`.

## Liens consultés

- Google Maps : https://www.google.com/maps/place/Riad+Souss/@48.9852761,2.3539245,17z
- TheFork : https://www.thefork.fr/restaurant/riad-souss-r338569 et `/menu`
- Instagram : https://www.instagram.com/restaurant_riad_souss/
- Annuaire des entreprises : https://recherche-entreprises.api.gouv.fr/search?q=riad%20souss%20groslay
- Tripadvisor : https://www.tripadvisor.com/Restaurant_Review-g4545874-d11785087-Reviews-Riad_Souss-Groslay_Val_d_Oise_Ile_de_France.html (accès bloqué, 403)
- Eat-List : https://www.eat-list.fr/groslay-95410/marocain-et-couscous-17/riad-souss-189326
- RestaurantGuru : https://restaurantguru.com/Le-KRoline-Groslay-2
- Sluurpy : https://www.sluurpy.fr/groslay/restaurant/2090452/riad-souss
- Mappy : https://fr.mappy.com/poi/587aa4c20351d16e1c1e01a3
- OpenStreetMap (gare) : https://nominatim.openstreetmap.org/search?q=Gare+de+Groslay
