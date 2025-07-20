# CAPS FACT - Intégration MongoDB

Ce guide explique comment installer et configurer l'intégration MongoDB pour CAPS FACT, remplaçant le stockage localStorage par une base de données sécurisée.

## 🚀 Installation

### Prérequis

1. **Node.js** (version 14 ou supérieure)
2. **MongoDB** (version 4.4 ou supérieure)
3. **npm** ou **yarn**

### Étapes d'installation

1. **Installer les dépendances**
   ```bash
   npm install
   ```

2. **Configurer MongoDB**
   
   **Option A : MongoDB local**
   - Installez MongoDB sur votre machine
   - Démarrez le service MongoDB
   - L'URL par défaut sera : `mongodb://localhost:27017/caps_fact`

   **Option B : MongoDB Atlas (cloud)**
   - Créez un compte sur [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Créez un cluster gratuit
   - Récupérez l'URL de connexion

3. **Configuration des variables d'environnement**
   ```bash
   # Copier le fichier d'exemple
   cp config/env.example .env
   
   # Éditer le fichier .env avec vos paramètres
   ```

   Exemple de configuration `.env` :
   ```env
   # Configuration MongoDB
   MONGODB_URI=mongodb://localhost:27017/caps_fact
   # Ou pour MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/caps_fact

   # Configuration JWT
   JWT_SECRET=votre_secret_jwt_tres_securise
   JWT_EXPIRES_IN=24h

   # Configuration serveur
   PORT=3000
   NODE_ENV=development

   # Configuration sécurité
   BCRYPT_ROUNDS=12
   ```

4. **Démarrer le serveur**
   ```bash
   # Mode développement (avec redémarrage automatique)
   npm run dev
   
   # Mode production
   npm start
   ```

5. **Accéder à l'application**
   - Ouvrez votre navigateur
   - Allez sur `http://localhost:3000`
   - Vous serez redirigé vers la page de connexion

## 🔐 Authentification

### Créer un compte

1. Allez sur `http://localhost:3000/register.html`
2. Remplissez le formulaire d'inscription
3. Configurez les informations de votre entreprise
4. Cliquez sur "Créer mon compte"

### Se connecter

1. Allez sur `http://localhost:3000/login.html`
2. Entrez votre email et mot de passe
3. Cliquez sur "Se connecter"

## 📊 Migration des données

Si vous avez des données existantes dans le localStorage, vous pouvez les migrer vers MongoDB :

1. Connectez-vous à l'application
2. Ouvrez la console du navigateur (F12)
3. Exécutez la commande :
   ```javascript
   await apiService.migrateFromLocalStorage()
   ```

## 🏗️ Architecture

### Backend (Node.js + Express)

- **`server.js`** : Serveur principal
- **`models/`** : Modèles MongoDB (User, Facture, Recette, Achat)
- **`routes/`** : Routes API REST
- **`middleware/`** : Middleware d'authentification

### Frontend

- **`assets/js/api-service.js`** : Service API pour communiquer avec le backend
- **`login.html`** : Page de connexion
- **`register.html`** : Page d'inscription

### Base de données

- **Users** : Comptes utilisateurs avec configuration
- **Factures** : Factures générées
- **Recettes** : Enregistrements des recettes
- **Achats** : Enregistrements des achats

## 🔧 API Endpoints

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/auth/profile` - Profil utilisateur
- `PUT /api/auth/profile` - Mise à jour profil
- `PUT /api/auth/change-password` - Changement mot de passe

### Factures
- `GET /api/factures` - Liste des factures
- `POST /api/factures` - Créer une facture
- `GET /api/factures/:id` - Détails d'une facture
- `PUT /api/factures/:id` - Modifier une facture
- `DELETE /api/factures/:id` - Supprimer une facture
- `GET /api/factures/stats/summary` - Statistiques

### Recettes
- `GET /api/recettes` - Liste des recettes
- `POST /api/recettes` - Créer une recette
- `GET /api/recettes/:id` - Détails d'une recette
- `PUT /api/recettes/:id` - Modifier une recette
- `DELETE /api/recettes/:id` - Supprimer une recette
- `GET /api/recettes/stats/summary` - Statistiques

### Achats
- `GET /api/achats` - Liste des achats
- `POST /api/achats` - Créer un achat
- `GET /api/achats/:id` - Détails d'un achat
- `PUT /api/achats/:id` - Modifier un achat
- `DELETE /api/achats/:id` - Supprimer un achat
- `GET /api/achats/stats/summary` - Statistiques

## 🔒 Sécurité

- **JWT** pour l'authentification
- **bcrypt** pour le hashage des mots de passe
- **Helmet** pour les en-têtes de sécurité
- **Rate limiting** pour prévenir les attaques
- **CORS** configuré pour les requêtes cross-origin

## 🚨 Dépannage

### Erreur de connexion MongoDB
```
❌ Erreur connexion MongoDB: MongoNetworkError
```
**Solution :** Vérifiez que MongoDB est démarré et que l'URL de connexion est correcte.

### Erreur JWT
```
❌ Token invalide
```
**Solution :** Vérifiez que `JWT_SECRET` est défini dans le fichier `.env`.

### Erreur de port
```
❌ Port 3000 déjà utilisé
```
**Solution :** Changez le port dans le fichier `.env` ou arrêtez le processus qui utilise le port 3000.

### Erreur de migration
```
❌ Erreur lors de la migration
```
**Solution :** Vérifiez que vous êtes connecté et que le serveur fonctionne correctement.

## 📝 Notes importantes

1. **Sauvegarde** : Pensez à sauvegarder régulièrement votre base de données MongoDB
2. **Sécurité** : Changez le `JWT_SECRET` en production
3. **Performance** : Les index sont créés automatiquement pour optimiser les requêtes
4. **Évolutivité** : L'architecture permet d'ajouter facilement de nouvelles fonctionnalités

## 🤝 Support

Pour toute question ou problème :
1. Vérifiez les logs du serveur
2. Consultez la console du navigateur
3. Vérifiez la documentation MongoDB

---

**CAPS FACT** - Système de facturation moderne avec MongoDB 