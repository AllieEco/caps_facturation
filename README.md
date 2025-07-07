# 🧾 Générateur de Factures Professionnel - Multi-Statuts 

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/AllieEco/caps_facturation.svg?style=social)](https://github.com/AllieEco/caps_facturation/stargazers)

## 📸 Aperçu du générateur

![Aperçu du générateur de factures](https://github.com/user-attachments/assets/208d91a5-4734-4991-8433-425cdcbc29bb)

*Interface moderne et intuitive avec aperçu en temps réel*

Un générateur de factures **100% gratuit** et **conforme** pour tous les entrepreneurs français. Créez des factures professionnelles en quelques clics, peu importe votre statut juridique !

## 🎯 Pourquoi choisir ce générateur ?

### ✅ **Adapté à TOUS les statuts juridiques français**
- **Micro-entreprise** : TVA non applicable, mentions spécifiques
- **SASU** : TVA 20% automatique, capital social, informations complètes
- **EURL** : TVA 20% automatique, gérant, associé unique

### ✅ **Interface ultra-simple**
- Pas besoin d'être informaticien
- Tout se fait dans votre navigateur web
- Aperçu en temps réel de votre facture
- Formulaire guidé étape par étape

### ✅ **100% gratuit et sécurisé**
- Aucun abonnement, aucune limite
- Vos données restent sur votre ordinateur
- Pas de compte à créer
- Code open source vérifiable

## 🚀 Toutes les fonctionnalités

### 📋 **Informations d'entreprise**
- **Logo personnalisé** : Ajoutez le logo de votre entreprise (image JPG, PNG...)
- **Statut juridique** : Sélectionnez micro-entreprise, SASU ou EURL
- **Coordonnées complètes** : Nom, adresse, SIRET, RCS, email, téléphone
- **Informations bancaires** : IBAN, BIC, nom de votre banque

### 🏢 **Fonctionnalités spécifiques par statut**

#### **Micro-entreprise**
- ✅ Calcul automatique **HT uniquement** (pas de TVA)
- ✅ Gestion **RCS optionnel** (commerce ou pas)
- ✅ Mention "TVA non applicable" automatique
- ✅ Toutes les mentions légales obligatoires

#### **SASU (Société par Actions Simplifiée Unipersonnelle)**
- ✅ Calcul automatique **HT et TTC** (TVA 20%)
- ✅ Champs spécifiques : Capital social, N° TVA, date création
- ✅ Informations TVA détaillées
- ✅ Mentions légales SASU complètes

#### **EURL (Entreprise Unipersonnelle à Responsabilité Limitée)**
- ✅ Calcul automatique **HT et TTC** (TVA 20%)
- ✅ Champs spécifiques : Capital social, Gérant, Associé unique
- ✅ Informations TVA avec régime réel normal
- ✅ Mentions légales EURL complètes

### 🛍️ **Gestion des prestations**
- **Prestations multiples** : Ajoutez autant de lignes que vous voulez
- **Descriptions détaillées** : Titre + description complète de chaque service
- **Calcul intelligent** : 
  - Saisissez le prix HT → Le TTC se calcule automatiquement (SASU/EURL)
  - Saisissez le prix TTC → Le HT se calcule automatiquement (SASU/EURL)
  - Prix HT uniquement pour les micro-entreprises
- **Quantités** : Gérez les quantités et calcul automatique des totaux
- **Modification facile** : Supprimez ou modifiez vos prestations d'un clic

### 👥 **Informations client**
- **Coordonnées complètes** : Nom, adresse, code postal, ville
- **SIRET client** : Optionnel mais utile pour les entreprises
- **N° TVA client** : Pour les clients assujettis à la TVA (SASU/EURL)
- **Période facturée** : Mois concerné par la facturation

### 💳 **Modes de paiement**
- **Virement bancaire** : Avec vos coordonnées bancaires automatiques
- **Chèque** : Mentions adaptées
- **Carte bancaire** : Pour les paiements en ligne
- **Espèces** : Avec mentions légales appropriées

### 📄 **Génération PDF professionnelle**
- **Aperçu en temps réel** : Voyez votre facture se construire au fur et à mesure
- **PDF haute qualité** : Factures prêtes à envoyer par email
- **Format A4** : Parfait pour l'impression
- **Nom de fichier automatique** : [N°Facture][NomClient].pdf
- **Multi-pages** : Gestion automatique des factures longues

### 🔧 **Configuration et sauvegarde**
- **Configuration unique** : Entrez vos informations une fois, elles sont sauvegardées
- **Pré-remplissage automatique** : Vos données d'entreprise se remplissent automatiquement
- **Personnalisation** : Adaptez tous les champs selon vos besoins

## 📱 **Compatible tous appareils**
- **Ordinateur** : Interface complète et confortable
- **Tablette** : Parfait pour les déplacements
- **Smartphone** : Créez des factures même en mobilité

## 🚀 Comment utiliser le générateur ?

### 1️⃣ **Première utilisation - Configuration**

1. **Téléchargez le générateur** :
   - Cliquez sur "Code" → "Download ZIP" sur GitHub
   - Décompressez le fichier sur votre ordinateur

2. **Configurez vos informations** :
   - Copiez le fichier `config.example.js` et renommez-le `config.js`
   - Ouvrez `config.js` avec un éditeur de texte (Bloc-notes, TextEdit...)
   - Remplissez vos informations d'entreprise :

```javascript
const CONFIG = {
  // Choisissez votre statut
  statutJuridique: "micro", // "micro", "sasu" ou "eurl"
  
  // Vos informations (remplacez par vos vraies données)
  emetteurNom: "Votre Nom ou Raison Sociale",
  emetteurContact: "Votre Prénom NOM",
  emetteurAdresse: "123 Rue de la Paix",
  emetteurCodePostal: "75001",
  emetteurVille: "Paris",
  emetteurSiret: "12345678901234",
  emetteurEmail: "votre.email@exemple.com",
  emetteurTel: "06 12 34 56 78",
  
  // Vos informations bancaires
  iban: "FR76 1234 5678 9012 3456 7890 123",
  bic: "ABCDEFGH",
  banque: "Nom de votre banque",
  
  // Pour les SASU (si statutJuridique = "sasu")
  capitalSocial: "1000",
  numTva: "FR12345678901",
  dateCreationSasu: "2024-01-01",
  
  // Pour les EURL (si statutJuridique = "eurl")
  capitalSocialEurl: "1000",
  numTvaEurl: "FR12345678901",
  dateCreationEurl: "2024-01-01",
  gerantEurl: "Votre Nom",
  associeUniqueEurl: "Votre Nom"
};
```

### 2️⃣ **Lancement du générateur**
- Ouvrez le fichier `facture.html` dans votre navigateur web
- Vos informations sont automatiquement pré-remplies !

### 3️⃣ **Création d'une facture**

#### **Étape 1 : Vérifiez vos informations**
- Vos données d'entreprise sont déjà remplies
- Ajoutez votre logo si vous le souhaitez (cliquez sur "Parcourir")
- Modifiez si nécessaire

#### **Étape 2 : Informations de la facture**
- **Numéro de facture** : Par défaut F001, changez selon votre numérotation
- **Date** : Date d'aujourd'hui par défaut
- **Date de prestation** : Quand le service a été réalisé

#### **Étape 3 : Informations client**
- **Nom du client** : Nom de votre client ou entreprise
- **Adresse complète** : Adresse, code postal, ville
- **SIRET** : Si c'est une entreprise (optionnel)
- **Période facturée** : Ex: "Juillet 2025"

#### **Étape 4 : Ajout des prestations**
- **Titre** : Nom du service (ex: "Développement site web")
- **Description** : Détails du service rendu
- **Prix** : 
  - **Micro-entreprise** : Saisissez le prix HT uniquement
  - **SASU/EURL** : Saisissez soit le HT soit le TTC, l'autre se calcule automatiquement
- **Quantité** : Nombre d'unités (heures, jours, pièces...)
- Cliquez sur "Ajouter" pour ajouter la prestation

#### **Étape 5 : Génération du PDF**
- Vérifiez l'aperçu à droite
- Cliquez sur "Enregistrer en PDF"
- Votre facture est prête !

## 🔒 Sécurité et confidentialité

### ✅ **Vos données sont 100% privées**
- Tout fonctionne dans votre navigateur
- Aucune donnée envoyée sur internet
- Pas de serveur, pas de base de données
- Vos informations restent sur votre ordinateur

### ✅ **Protection de votre configuration**
- Le fichier `config.js` ne sera jamais partagé
- Vos informations bancaires restent confidentielles
- Code source transparent et vérifiable

## ⚖️ Conformité légale complète

Ce générateur respecte **toutes les obligations légales françaises** :

### 📋 **Micro-Entreprise**
- ✅ Mention "TVA non applicable, art. 293 B du CGI"
- ✅ Indemnité forfaitaire de recouvrement (40€)
- ✅ Pénalités de retard (3 fois le taux légal)
- ✅ Dispense d'immatriculation RCS (si applicable)
- ✅ Numéro SIRET obligatoire

### 🏢 **SASU**
- ✅ Capital social affiché
- ✅ N° TVA intracommunautaire
- ✅ Calcul TVA 20% automatique
- ✅ Informations TVA détaillées
- ✅ Mentions légales SASU complètes
- ✅ Numéro RCS obligatoire

### 🏭 **EURL**
- ✅ Capital social EURL
- ✅ Gérant et associé unique
- ✅ Régime réel normal
- ✅ TVA sur les débits
- ✅ Responsabilité limitée
- ✅ Mentions légales EURL complètes

## 🆘 Aide et support

### 🤔 **Questions fréquentes**

**Q : Puis-je utiliser ce générateur pour ma comptabilité ?**
R : Oui ! Les factures générées sont conformes et acceptées par les experts-comptables.

**Q : Mes données sont-elles sécurisées ?**
R : Absolument ! Tout fonctionne hors ligne, vos données ne quittent jamais votre ordinateur.

**Q : Puis-je modifier le design des factures ?**
R : Le design est optimisé pour la conformité légale, mais vous pouvez ajouter votre logo.

**Q : Ça fonctionne sur Mac/Windows/Linux ?**
R : Oui ! Il suffit d'un navigateur web moderne.

**Q : Puis-je imprimer mes factures ?**
R : Oui ! Utilisez Ctrl+P ou générez un PDF pour l'impression.

### 🐛 **Problème ou suggestion ?**
- Ouvrez une [issue sur GitHub](https://github.com/AllieEco/caps_facturation/issues)
- Décrivez votre problème ou suggestion
- Nous vous aiderons rapidement !

## 🤝 Contribuer au projet

Ce projet est **gratuit et open source**. Vous pouvez aider en :

- ⭐ **Donnant une étoile** au projet GitHub
- 🐛 **Signalant les bugs** que vous rencontrez
- 💡 **Proposant des améliorations**
- 📝 **Améliorant la documentation**
- 🔄 **Partageant avec d'autres entrepreneurs**


## 📜 Licence

Ce projet est sous licence MIT - vous pouvez l'utiliser librement pour votre entreprise.



---

## ⚖️ Mentions légales

Ce générateur est conçu pour les **entrepreneurs français** (micro-entreprises, SASU et EURL). Il respecte la réglementation en vigueur mais nous vous recommandons de vérifier la conformité avec votre situation fiscale spécifique.

**Développé avec ❤️ pour les entrepreneurs français**

---

⭐ **Si ce générateur vous aide à gagner du temps et de l'argent, soutenez-nous avec une étoile !** ⭐

**Bonne facturation ! 🚀**
