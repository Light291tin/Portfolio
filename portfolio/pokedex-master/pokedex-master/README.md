# Pokedex Nova

Pokedex Nova est une application web front-end en HTML, CSS et JavaScript qui affiche un catalogue Pokemon avec une interface originale, inspirée d'un terminal retro-futuriste.

Le projet utilise PokeAPI pour recuperer les donnees des Pokemon, leurs statistiques, leurs types, leurs descriptions et leurs evolutions.

## Apercu

- Catalogue des 151 Pokemon de Kanto
- Recherche par nom ou numero
- Filtre par type
- Panneau de detail avec description, statistiques, resistances, faiblesses et evolution
- Interface responsive pour ordinateur et mobile

## API utilisee

Source de donnees : PokeAPI

- Liste des Pokemon : https://pokeapi.co/api/v2/pokemon?limit=151&offset=0
- Documentation : https://pokeapi.co/

## Technologies

- HTML5
- CSS3
- JavaScript vanilla
- Google Fonts : Orbitron et Space Grotesk

## Structure du projet

- [index.html](index.html) : structure de la page
- [styles.css](styles.css) : interface et responsive design
- [app.js](app.js) : logique applicative, appels API, filtres et panneau de detail

## Lancer le projet

Comme il s'agit d'un projet front-end statique, tu peux l'ouvrir tres simplement.

### Option 1

Ouvrir directement [index.html](index.html) dans le navigateur.

### Option 2

Lancer un petit serveur local si tu preferes travailler dans de meilleures conditions de developpement.

Exemple avec VS Code et Live Server, ou avec un serveur statique classique.

## Fonctionnement

1. L'application charge les 151 premiers Pokemon depuis PokeAPI.
2. Chaque fiche affiche un apercu avec image, types et total de statistiques.
3. Un clic sur une carte ouvre la fiche detaillee a droite.
4. Les informations complementaires comme la description et la chaine d'evolution sont chargees et mises en cache.

## Points forts du projet

- Design plus original qu'un Pokedex classique
- Pas de framework, donc projet leger et facile a comprendre
- Code separe en trois fichiers simples
- Bonne base pour ajouter pagination, generations supplementaires ou comparateur de Pokemon

## Evolutions possibles

- Ajouter toutes les generations
- Ajouter un comparateur entre deux Pokemon
- Ajouter une recherche par statistiques
- Ajouter une musique de fond avec controle lecture / pause

## Auteur

Projet realise dans le cadre d'un travail BTS.
