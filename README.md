# 🧾 Suite de Gestion Comptable - Multi-Statuts 

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/AllieEco/caps_facturation.svg?style=social)](https://github.com/AllieEco/caps_facturation/stargazers)

## 📸 Aperçu

![image](https://github.com/user-attachments/assets/9be29747-4d91-4606-8c17-e39d0294fa6f)


**Suite de gestion comptable complète et gratuite** pour tous les entrepreneurs français. Tableau de bord intelligent, facturation, gestion des recettes et suivi des achats.

## 🎯 **Nouveau : Tableau de bord comptable intelligent !**

**Votre vue d'ensemble financière en temps réel** avec :
- **📊 Statistiques dynamiques** : CA, dépenses, bénéfice/déficit automatique
- **📈 Graphiques interactifs** : Évolution sur 12 mois et répartition des paiements
- **🎯 Indicateurs intelligents** : Détection automatique bénéfice/déficit avec émojis adaptatifs
- **⏰ Filtres temporels** : Analyse par période (mois, trimestre, année)
- **🔄 Mise à jour automatique** : Synchronisation toutes les 5 secondes

## 🚀 Les 4 modules de la suite

### 1️⃣ **📊 Tableau de Bord Comptable**
- **Vue d'ensemble financière** : CA, dépenses, bénéfice/déficit en temps réel
- **Graphiques interactifs** : Évolution du CA et répartition des paiements
- **Filtres temporels** : Analyse par période (mois, trimestre, année)
- **Activité récente** : Dernières factures et achats

### 2️⃣ **🧾 Générateur de Factures/Devis**
- **Mode DEVIS/FACTURE** : Bascule d'un simple clic
- **4 statuts juridiques** : Micro-entreprise, SASU, EURL, SARL
- **Gestion clients intelligente** : Particuliers et entreprises
- **Calcul automatique** : TVA, totaux, acomptes
- **Export professionnel** : PDF haute qualité + CSV

### 3️⃣ **💰 Livre de Recette - NOUVEAU !**
- **📝 Enregistrement facile** : Formulaire simple et guidé avec calcul automatique TTC
- **📊 Statistiques en temps réel** : Total recettes, recettes du mois, nombre de factures, moyenne
- **🔍 Filtres avancés** : Par année, mois, client avec recherche instantanée
- **📋 Historique complet** : Tableau détaillé avec totaux automatiques
- **📄 Export professionnel** : PDF format paysage avec récapitulatif mensuel et annuel
- **💳 Gestion des paiements** : Virement, chèque, carte, espèce avec dates d'encaissement
- **⚡ Interface moderne** : Design responsive avec animations et effets visuels

### 4️⃣ **🛒 Registre d'Achat**
- **Suivi des achats** : Enregistrement complet des dépenses
- **Catégorisation** : Organisation par type d'achat
- **Analyse des dépenses** : Statistiques par période et catégorie
- **Export comptable** : Données CSV pour votre comptable

## ✅ **Adapté aux 4 statuts juridiques français**
- **Micro-entreprise** : TVA non applicable, mentions spécifiques
- **SASU** : TVA 20% automatique, capital social, président
- **EURL** : TVA 20% automatique, gérant, associé unique
- **SARL** : TVA 20% automatique, capital social, gérant, associés

## 🚀 Installation et configuration

### 1️⃣ **Téléchargement**
1. Cliquez sur "Code" → "Download ZIP" sur GitHub
2. Décompressez le fichier sur votre ordinateur

### 2️⃣ **Configuration initiale**
1. Copiez `config/config.example.js` et renommez-le `config/config.js`
2. Ouvrez `config/config.js` et remplissez vos informations :

```javascript
const CONFIG = {
  statutJuridique: "micro", // "micro", "sasu", "eurl" ou "sarl"
  emetteurNom: "Votre Nom ou Raison Sociale",
  emetteurContact: "Votre Prénom NOM",
  emetteurAdresse: "123 Rue de la Paix",
  emetteurCodePostal: "75001",
  emetteurVille: "Paris",
  emetteurSiret: "12345678901234",
  emetteurEmail: "votre.email@exemple.com",
  emetteurTel: "06 12 34 56 78",
  iban: "FR76 1234 5678 9012 3456 7890 123",
  bic: "ABCDEFGH",
  banque: "Nom de votre banque"
};
```

### 3️⃣ **Lancement**
- Ouvrez `index.html` dans votre navigateur pour accéder au tableau de bord
- Utilisez les boutons du header pour naviguer entre les modules

## 🎯 Utilisation rapide

### **Workflow complet : Du devis au paiement**
1. **Créer un devis** : Module facture, mode DEVIS
2. **Envoyer au client** : Export PDF du devis
3. **Devis accepté** : Basculer en mode FACTURE
4. **Envoyer la facture** : Export PDF de la facture
5. **Paiement reçu** : Enregistrer dans le livre de recette

### **Gestion clients particuliers/entreprises**
- **Client particulier** : Ne pas cocher la case "entreprise"
- **Client entreprise** : Cocher la case et remplir SIRET/TVA
- **Documents adaptés** : Les mentions s'ajustent automatiquement

### **💡 Utilisation du Livre de Recette**
1. **Enregistrer une recette** : Remplir le formulaire avec les informations de facturation
2. **Calcul automatique** : Le montant TTC se calcule automatiquement selon le taux de TVA
3. **Suivi des paiements** : Indiquer le mode de paiement et la date d'encaissement
4. **Filtres et recherche** : Utiliser les filtres pour analyser vos recettes par période
5. **Export comptable** : Générer des rapports PDF professionnels pour votre comptable

## 🔒 Sécurité et confidentialité

### ✅ **Vos données sont 100% privées**
- Tout fonctionne dans votre navigateur
- Aucune donnée envoyée sur internet
- Stockage local uniquement
- Code open source vérifiable

## 📊 Structure des fichiers

```
caps_facturation/
├── index.html                    # Tableau de bord principal
├── pages/                        # Modules de l'application
│   ├── facture.html             # Générateur de factures/devis
│   ├── livre_recette.html       # Livre de recette
│   └── registre_achat.html      # Registre d'achat
├── assets/                       # Ressources (CSS, JS, images)
│   ├── css/                     # Styles CSS
│   ├── js/                      # Scripts JavaScript
│   └── images/                  # Images et logos
├── templates/                    # Templates HTML réutilisables
├── config/                       # Configuration
│   ├── config.example.js        # Configuration par défaut
│   └── config.js               # Votre configuration
└── README.md                    # Ce fichier
```

## 📞 Support et aide

### 🐛 **Problème ou bug ?**
- Ouvrez une [issue sur GitHub](https://github.com/AllieEco/caps_facturation/issues)
- Précisez le module concerné et décrivez le problème

### 💡 **Idée d'amélioration ?**
- Partagez vos suggestions via une [issue GitHub](https://github.com/AllieEco/caps_facturation/issues)

## 🌟 Contribuer

Ce projet est **open source** ! Vous pouvez contribuer :
- **Développement** : Améliorer le code
- **Design et UX** : Optimiser l'interface
- **Documentation** : Améliorer ce README

## ⭐ Vous aimez ce projet ?

- **Mettez une étoile** sur GitHub
- **Partagez** avec d'autres entrepreneurs
- **Contribuez** avec vos idées

## 📄 Licence

Ce projet est sous licence MIT. Vous êtes libre de :
- ✅ Utiliser commercialement
- ✅ Modifier le code
- ✅ Distribuer
- ✅ Utiliser en privé

---

**Made with ❤️ by [AllieEco](https://github.com/AllieEco)**

*Une suite gratuite et open source pour tous les entrepreneurs français*
