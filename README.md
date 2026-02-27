#  Annuaire Utilisateurs React

Application React avec routing, architecture API découplée (Axios +
JSONPlaceholder)\
et stratégie complète de tests (Unitaires + Intégration + E2E) avec
CI/CD,\
publication automatique NPM et déploiement continu.

------------------------------------------------------------------------

##  Objectif pédagogique

Ce projet met en place une architecture complète autour de :

-   Tests unitaires
-   Tests d'intégration
-   Tests E2E avec Cypress
-   Isolation du front-end via mocking des appels API
-   Gestion des erreurs serveur (400 / 500)
-   Couverture de code (Codecov)
-   Génération automatique de documentation (JSDoc)
-   Pipeline CI/CD avec GitHub Actions
-   Publication automatique sur NPM
-   Déploiement automatique via GitHub Pages

------------------------------------------------------------------------

##  Technologies

-   React
-   React Router (HashRouter pour GitHub Pages)
-   Axios
-   JSONPlaceholder
-   Jest
-   Cypress
-   GitHub Actions
-   Codecov
-   GitHub Pages
-   NPM (Distribution)

------------------------------------------------------------------------

##  Fonctionnalités

-   Inscription d'utilisateurs avec validation
-   Appels API via Axios (`GET /users`, `POST /users`)
-   Affichage dynamique de la liste des inscrits
-   Routing entre Home et Register
-   Validation métier (âge, email, code postal...)
-   Gestion des erreurs métier (400 -- email déjà existant)
-   Gestion des erreurs serveur (500 -- crash backend)
-   Tests unitaires et d'intégration Jest avec mocking
-   Tests E2E Cypress avec interception réseau
-   Publication automatique du package NPM
-   Déploiement automatique à chaque push

------------------------------------------------------------------------

##  Évolution d'architecture

Le projet ne repose plus sur `localStorage`.

L'application est désormais découplée du backend via :

-   Un service API : `src/services/api.js`
-   Axios pour les appels réseau
-   JSONPlaceholder comme API cible

Routes implémentées :

-   `GET /users`
-   `POST /users`

Les composants ne connaissent pas Axios directement : ils passent par le
service API.

------------------------------------------------------------------------

##  Stratégie de Tests

### Tests Jest (Unitaires + Intégration)

Les appels API sont entièrement mockés :

``` js
jest.mock('axios')
```

Cas testés :

-   Succès 200 (GET)
-   Succès 201 (POST)
-   Erreur métier 400
-   Erreur serveur 500
-   Gestion asynchrone avec `async/await`
-   Utilisation de `waitFor` pour tester les changements d'état UI

Aucun appel réseau réel ne sort des tests Jest.

------------------------------------------------------------------------

### Tests Cypress (E2E)

Les appels API sont interceptés :

``` js
cy.intercept()
```

Cas simulés :

-   GET 200
-   POST 201
-   POST 400
-   POST 500

Les tests E2E fonctionnent sans backend réel.

------------------------------------------------------------------------

##  Publication NPM & Semantic Versioning

Le projet est distribué sous forme de package NPM publié automatiquement
via GitHub Actions.

###  Versioning (SemVer)

Le versioning suit la spécification **Semantic Versioning** :

-   **PATCH** → correction de bugs (`1.0.0 → 1.0.1`)
-   **MINOR** → ajout compatible (`1.0.1 → 1.1.0`)
-   **MAJOR** → modification incompatible (`1.1.0 → 2.0.0`)

Les versions sont incrémentées avec :

``` bash
npm version patch
npm version minor
npm version major
```

Le workflow CI compare la version locale (`package.json`) à la version
publiée sur NPM.

-   Si la version locale est supérieure → publication automatique.
-   Sinon → publication ignorée (logique de bypass).

###  Package publié

 https://www.npmjs.com/package/@tintin0013/tintin-ci-cd-ynov

------------------------------------------------------------------------

##  Livrables

-   Dépôt GitHub\
    https://github.com/tintin0013/tp-test-mock

-   Application déployée\
    https://tintin0013.github.io/tp-test-mock/

-   Documentation JSDoc\
    https://tintin0013.github.io/tp-test-mock/docs/

-   Tableau Codecov\
    https://codecov.io/gh/tintin0013/tp-test-mock

------------------------------------------------------------------------

##  Organisation du projet

-   `src/services/api.js` → Service Axios
-   `src/components/` → Home & Register
-   `src/module/` → Logique métier & validations
-   `*.test.js` → Tests Jest
-   `cypress/` → Tests E2E
-   `.github/workflows/` → Pipeline CI/CD
-   `public/docs/` → Documentation générée automatiquement
-   `dist/` → Build pour distribution NPM

------------------------------------------------------------------------

## ▶ Démarrage rapide

``` bash
git clone https://github.com/tintin0013/tp-test-mock.git
cd tp-test-mock
npm install
npm start
```

Application accessible sur :

http://localhost:3000

------------------------------------------------------------------------

##  Exécuter les tests

### Tests unitaires et intégration

``` bash
npm test
```

### Tests Cypress E2E

``` bash
npm run cypress
```

------------------------------------------------------------------------

##  Build & Déploiement

``` bash
npm run build
```

Le déploiement sur GitHub Pages est automatique via GitHub Actions lors
d'un push sur `main`.

------------------------------------------------------------------------

##  Documentation

``` bash
npm run jsdoc
```

La documentation est :

-   Générée en CI
-   Copiée dans `build/docs`
-   Déployée automatiquement

------------------------------------------------------------------------

## ⚙ CI/CD

À chaque push sur `main`, le workflow :

1.  Installe les dépendances\
2.  Génère la documentation JSDoc\
3.  Lance les tests unitaires avec coverage\
4.  Envoie la couverture vers Codecov\
5.  Lance les tests Cypress\
6.  Build le projet\
7.  Publie sur NPM (si version supérieure)\
8.  Déploie automatiquement sur GitHub Pages

------------------------------------------------------------------------

##  Conclusion

Ce projet met en place :

-   Architecture découplée via API
-   Isolation complète du front-end
-   Gestion des erreurs 400 / 500
-   Tests unitaires mockés
-   Tests E2E interceptés
-   Couverture suivie avec Codecov
-   Documentation automatique
-   CI/CD complet
-   Publication automatique NPM
-   Déploiement automatisé

Projet réalisé dans un cadre pédagogique pour maîtriser le mocking,\
la résilience UI et l'automatisation complète d'un front-end React.
