#  Annuaire Utilisateurs React

Application React avec routing, architecture API découplée (Axios + Backend Python/MySQL)\
et stratégie complète de tests (Unitaires + Intégration + E2E) avec CI/CD,\
Dockerisation complète et orchestration fullstack.

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
-   Orchestration complète avec Docker Compose
-   Tests d’intégration sur environnement réel (Docker)

------------------------------------------------------------------------

##  Technologies

-   React
-   React Router (HashRouter pour GitHub Pages)
-   Axios
-   FastAPI (Backend Python)
-   MySQL
-   Adminer
-   Jest
-   Cypress
-   Docker / Docker Compose
-   GitHub Actions
-   Codecov
-   GitHub Pages
-   NPM (Distribution)

------------------------------------------------------------------------

##  Fonctionnalités

-   Inscription d'utilisateurs avec validation
-   Appels API via Axios (`GET /users`, `POST /users`)
-   Backend réel connecté à une base MySQL
-   Affichage dynamique de la liste des inscrits
-   Routing entre Home et Register
-   Validation métier (âge, email, code postal...)
-   Gestion des erreurs métier (400 -- email déjà existant)
-   Gestion des erreurs serveur (500 -- crash backend)
-   Tests unitaires et d'intégration Jest avec mocking
-   Tests E2E Cypress avec interception réseau
-   Tests E2E réels sur environnement Docker
-   Publication automatique du package NPM
-   Déploiement automatique à chaque push

------------------------------------------------------------------------

##  Architecture

L'application est entièrement découplée :

-   Frontend React
-   Backend Python (FastAPI)
-   Base de données MySQL

Communication :

-   Front → API (Axios)
-   API → MySQL

Le frontend ne dépend jamais directement de la base de données.

------------------------------------------------------------------------

##  Orchestration Docker

L’ensemble de la stack est orchestré avec Docker Compose :

-   Service **db** → MySQL avec healthcheck
-   Service **server** → API FastAPI
-   Service **frontend** → React
-   Service **adminer** → Interface DB

###  Ordonnancement sécurisé

-   MySQL doit être **healthy** avant backend
-   Backend doit être **healthy** avant frontend

Cela garantit :

-   Aucun démarrage prématuré
-   Pas de race condition
-   Stabilité de la stack

------------------------------------------------------------------------

##  Lancement Docker

```bash
docker compose up -d --build
```

Accès :

- Frontend : http://localhost:3000/tp-test-mock
- API : http://localhost:8000/users
- Adminer : http://localhost:8080

------------------------------------------------------------------------

##  Stratégie de Tests

### Tests Jest (Unitaires + Intégration)

Les appels API sont mockés :

```js
jest.mock('axios')
```

Aucun appel réseau réel.

### Tests Cypress (E2E)

Deux niveaux :

1. Tests mockés (intercept)
2. Tests réels via Docker (CI)

------------------------------------------------------------------------

##  CI/CD

Pipeline GitHub Actions :

1. Installation dépendances
2. Génération JSDoc
3. Tests Jest + coverage
4. Envoi Codecov
5. Tests Cypress
6. Build React
7. Publication NPM
8. Lancement Docker Compose
9. Test API réel
10. Push image DockerHub
11. Déploiement GitHub Pages

------------------------------------------------------------------------

##  Docker Integration Tests

La pipeline démarre toute la stack :

```bash
docker compose up -d --build
```

Puis vérifie :

```bash
curl http://localhost:8000/users
```

Si OK → image Docker publiée.

------------------------------------------------------------------------

##  Livrables

-   Dépôt GitHub  
    https://github.com/tintin0013/tp-test-mock

-   Application déployée  
    https://tintin0013.github.io/tp-test-mock/

-   Documentation JSDoc  
    https://tintin0013.github.io/tp-test-mock/docs/

-   Codecov  
    https://codecov.io/gh/tintin0013/tp-test-mock

-   DockerHub  
    https://hub.docker.com/r/tintin0013/ynov-ci-fastapi

------------------------------------------------------------------------

##  Conclusion  

Projet complet incluant :

- Architecture fullstack
- Orchestration Docker
- Tests multi-niveaux
- CI/CD industriel
- Déploiement automatisé
