# Annuaire Utilisateurs React

Application React avec routing, localStorage et stratégie complète de tests  
(Unitaires + Intégration + E2E) avec CI/CD et déploiement automatique.

---

## 🎯 Objectif pédagogique

Ce projet a pour objectif de mettre en place une architecture complète autour :

- Tests unitaires
- Tests d’intégration
- Tests E2E avec Cypress
- Couverture de code (Codecov)
- Génération automatique de documentation (JSDoc)
- Pipeline CI/CD avec GitHub Actions
- Déploiement automatique via GitHub Pages

---

## 🛠 Technologies

- React  
- React Router (HashRouter pour GitHub Pages)  
- Jest (tests unitaires et intégration)  
- Cypress (tests E2E)  
- GitHub Actions (CI/CD)  
- Codecov (suivi de couverture)  
- GitHub Pages (déploiement)  

---

## 🚀 Fonctionnalités

- Inscription d’utilisateurs avec validation
- Stockage des utilisateurs dans le localStorage
- Affichage dynamique de la liste des inscrits
- Routing entre Home et Register
- Validation métier (âge, email, code postal…)
- Tests unitaires et d’intégration Jest
- Tests End-To-End Cypress
- Déploiement automatique à chaque push

---

## 📦 Livrables

- **Dépôt GitHub** :  
  https://github.com/tintin0013/tp-test-mock  

- **Application déployée** :  
  https://tintin0013.github.io/tp-test-mock/  

- **Documentation JSDoc** :  
  https://tintin0013.github.io/tp-test-mock/docs/  

- **Tableau Codecov** :  
  https://codecov.io/gh/tintin0013/tp-test-mock  

---

## 🏗 Organisation du projet

Le projet est structuré autour de :

- `src/` → Application React (composants, logique métier, validations)
- `module/` → Logique métier et règles de validation
- `*.test.js` → Tests unitaires et d’intégration
- `cypress/` → Tests End-To-End
- `.github/workflows/` → Pipeline CI/CD
- `public/docs/` → Documentation générée automatiquement

---

## ▶ Démarrage rapide

```bash
# Clone du projet
git clone https://github.com/tintin0013/tp-test-mock.git
cd tp-test-mock

# Installation des dépendances
npm install

# Lancer le serveur de développement
npm start
```

Application accessible sur :

http://localhost:3000

---

## 📋 Exécuter les tests

### Tests unitaires et intégration

```bash
npm test
```

### Tests Cypress E2E

```bash
npm run cypress
```

---

## 🏗 Build & Déploiement

### Build de production

```bash
npm run build
```

Le déploiement sur GitHub Pages est automatique via GitHub Actions lors d’un push sur `main`.

---

## 📚 Documentation

La documentation est générée avec :

```bash
npm run jsdoc
```

Elle est automatiquement :

- Générée en CI
- Copiée dans `build/docs`
- Déployée sur GitHub Pages

---

## 🔄 CI/CD

À chaque push sur `main`, le workflow :

1. Installe les dépendances  
2. Génère la documentation JSDoc  
3. Lance les tests unitaires avec coverage  
4. Envoie la couverture vers Codecov  
5. Lance les tests Cypress  
6. Build le projet  
7. Déploie automatiquement sur GitHub Pages  

---

## ✅ Conclusion

Ce projet met en place :

- ✔ Tests unitaires  
- ✔ Tests d’intégration  
- ✔ Tests E2E  
- ✔ Couverture suivie avec Codecov  
- ✔ Documentation automatique  
- ✔ CI/CD complet  
- ✔ Déploiement automatisé  

Projet réalisé dans un cadre pédagogique pour maîtriser les tests, la validation métier et l’automatisation.