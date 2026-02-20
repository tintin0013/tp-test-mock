# PLAN DE TESTS – Annuaire Utilisateurs React

---

## 1️⃣ Contexte et objectifs

**Projet :** Annuaire utilisateurs React  
**Type :** Application avec validation métier + localStorage + routing  
**Stratégie :** Tests unitaires + intégration + E2E  

### Objectifs pédagogiques

- Valider la logique métier indépendamment de l’UI
- Tester l’intégration complète formulaire → localStorage → affichage
- Tester les interactions utilisateur réelles
- Atteindre une couverture maximale
- Séparer clairement UT / IT / E2E
- Automatiser l’exécution via CI/CD

---

## 2️⃣ Tests Unitaires (UT)

Les tests unitaires vérifient les fonctions métier indépendamment de React.

### 📁 module.test.js

Objectif : Valider les fonctions métier pures.

Fonctions testées :

- `calculateAge()`
- `validatePostalCode()`
- `validateCity()`
- `verifyIdentity()`
- `verifyEmail()`
- `validateForm()`

Scénarios couverts :

- Âge valide / invalide / futur
- Personne mineure
- Cas limite majorité exacte
- Année bissextile
- Email invalide
- Code postal invalide
- Identité invalide
- Valeurs vides
- Protection contre injection XSS
- Combinaisons complètes valides

Couverture module : 100% des fonctions métier.

---

## 3️⃣ Tests du Formulaire (Validation temps réel)

### 📁 Form.test.js

Objectif : Tester la gestion du formulaire et la validation en temps réel.

Scénarios couverts :

- Validation des 6 champs
- Affichage des erreurs sous les champs
- Suppression des erreurs après correction
- Bouton désactivé si formulaire invalide
- Bouton activé si formulaire valide
- Gestion des valeurs null / vides
- Soumission valide
- Reset des champs après soumission

Ces tests vérifient :

- Rendu DOM
- Gestion des états React
- Fonction `isFormValid()`
- Appel de `onSubmitSuccess`

---

## 4️⃣ Tests d’Intégration (IT)

### 📁 App.test.js

Objectif : Tester l’intégration entre :

App → Form → localStorage → compteur → affichage Home

Scénarios couverts :

- Soumission complète valide
- Incrémentation du compteur utilisateurs
- Persistance des données via localStorage
- Réaffichage correct des utilisateurs
- Reset de l’interface après soumission

Les tests utilisent :

- Simulation utilisateur
- Vérification DOM
- Vérification localStorage via spy

---

## 5️⃣ Tests End-To-End (E2E)

### 📁 cypress/e2e/navigation.cy.js

Objectif : Tester l’application comme un vrai utilisateur.

Scénarios couverts :

### Navigation

- Accès page Home
- Navigation vers Register
- Retour automatique après inscription

### Scénario classique

- Formulaire rempli correctement
- Bouton activé
- Toast succès
- Redirection
- Vérification localStorage
- Affichage du nouvel utilisateur

### Scénario erreur

- Email déjà existant
- Champs manquants
- Bouton désactivé
- Vérification que le compteur ne change pas

Ces tests valident :

- Routing HashRouter
- Interaction complète UI
- Persistance réelle navigateur

---

## 6️⃣ Couverture de code

Objectif pédagogique : couverture maximale.

La couverture est générée avec :

```
npm test
```

Elle est :

- Mesurée automatiquement
- Envoyée vers Codecov
- Vérifiée à chaque push via GitHub Actions

Couverture actuelle : >95%

---

## 7️⃣ Stratégie globale

| Type | Objectif | Portée |
|------|----------|--------|
| UT | Logique métier isolée | module.js / validator.js |
| IT | Intégration React + métier | Form.js / App.js |
| E2E | Parcours utilisateur réel | Application complète |

---

## 8️⃣ Automatisation CI/CD

À chaque push sur `main` :

1. Installation des dépendances
2. Génération JSDoc
3. Tests unitaires + coverage
4. Upload Codecov
5. Tests Cypress E2E
6. Build production
7. Déploiement GitHub Pages

---

## 9️⃣ Conclusion

La stratégie garantit :

- Validation fonctionnelle complète
- Validation DOM et états React
- Validation des interactions utilisateur
- Validation de la persistance localStorage
- Sécurité UI (bouton disabled)
- Robustesse métier
- Exécution automatisée
- Déploiement contrôlé

Ce plan couvre intégralement :

- La logique métier
- L’intégration UI
- Le comportement utilisateur réel
- L’automatisation complète du projet