# Générateur de Factures pour Micro-Entreprises - CAPSLOCK

Un générateur de factures **spécialement conçu** pour les micro-entrepreneurs français. Simple, gratuit et 100% adapté au régime de la micro-entreprise.

## ✨ Pourquoi ce générateur ?

Ce générateur a été créé spécifiquement pour répondre aux besoins des **micro-entreprises françaises** :

- ✅ **Pas de TVA** - Applique automatiquement la mention "TVA non applicable, art. 293 B du CGI"
- ✅ **Mentions légales conformes** - Toutes les mentions obligatoires pour les micro-entreprises
- ✅ **Simple et rapide** - Aucune installation, fonctionne dans votre navigateur
- ✅ **Gratuit à vie** - Pas d'abonnement, pas de limitations
- ✅ **Données privées** - Vos informations restent sur votre ordinateur

## 🚀 Fonctionnalités

- **Interface moderne et intuitive** - Créez vos factures en quelques clics
- **Génération PDF instantanée** - Factures prêtes à envoyer
- **Calcul automatique des totaux** - Fini les erreurs de calcul
- **Gestion des prestations multiples** - Ajoutez autant de lignes que nécessaire
- **Conformité légale micro-entreprise** - Toutes les mentions obligatoires incluses
- **Design responsive** - Fonctionne sur ordinateur, tablette et mobile
- **Sauvegarde automatique** - Vos informations sont mémorisées

## 📋 Prérequis

- Un navigateur web moderne (Chrome, Firefox, Safari, Edge)
- **Aucune installation requise** - 100% en ligne !

## ⚙️ Installation et Configuration

### 1. Récupérer le projet

```bash
git clone https://github.com/AllieEco/caps_facturation.git
cd caps_facturation
```

### 2. Configurer vos informations de micro-entreprise

1. **Copiez le fichier de configuration** :
   ```bash
   cp config.example.js config.js
   ```

2. **Remplissez vos informations** dans `config.js` :
   ```javascript
   const CONFIG = {
     // Vos informations de micro-entreprise
     emetteurNom: "Votre Nom ou Raison Sociale",
     emetteurContact: "Votre Prénom NOM",
     emetteurAdresse: "Votre adresse complète\nCode postal Ville",
     emetteurSiret: "Votre numéro SIRET",
     emetteurRcs: "Dispensé d'immatriculation au RCS", // ou votre RCS
     emetteurEmail: "votre.email@exemple.com",
     emetteurTel: "06 12 34 56 78",
     
     // Vos informations bancaires
     iban: "FR76 1234 5678 9012 3456 7890 123",
     bic: "ABCDEFGH",
     banque: "Nom de votre banque"
   };
   ```

### 3. Lancer l'application

**C'est tout !** Ouvrez simplement `facture.html` dans votre navigateur.

## 📝 Comment créer une facture ?

1. **📋 Informations client** : Remplissez le nom, l'adresse et le SIRET de votre client
2. **🛍️ Prestations** : Ajoutez vos services/produits avec description, prix et quantité
3. **👀 Vérification** : L'aperçu se met à jour automatiquement
4. **📄 Génération** : Cliquez sur "Imprimer / Enregistrer en PDF"

## 🔒 Vos données sont protégées

- ✅ **Confidentialité totale** - Vos informations restent sur votre ordinateur
- ✅ **Pas de serveur** - Aucune donnée envoyée sur internet
- ✅ **Git ignore** - Le fichier `config.js` n'est jamais partagé
- ✅ **Open source** - Code 100% transparent et vérifiable

## 📄 Conformité Micro-Entreprise

Ce générateur respecte **toutes les obligations légales** des micro-entreprises :

### Mentions obligatoires incluses :
- ✅ TVA non applicable, art. 293 B du CGI
- ✅ Indemnité forfaitaire de recouvrement (40€)
- ✅ Taux de pénalité de retard (3 fois le taux d'intérêt légal)
- ✅ Modalités de paiement (30 jours)
- ✅ Coordonnées complètes de l'émetteur
- ✅ Numéro SIRET obligatoire
- ✅ Dispense d'immatriculation RCS (si applicable)

## 🆘 Support et Aide

- 🐛 **Problème ?** - Ouvrez une [issue sur GitHub](https://github.com/AllieEco/caps_facturation/issues)
- 💡 **Suggestion ?** - Proposez vos améliorations !
- 📖 **Documentation** - Tout est expliqué dans ce README

## 🤝 Contribution

Ce projet est **open source** et **gratuit pour toujours**. 

Vous pouvez contribuer en :
- 🐛 Signalant des bugs
- 💡 Proposant des améliorations
- 📝 Améliorant la documentation
- ⭐ Mettant une étoile au projet !

## 📱 Captures d'écran

*Interface moderne adaptée aux micro-entreprises*

---

## ⚖️ Mentions légales

Ce générateur est conçu pour les **micro-entreprises françaises**. Il respecte la réglementation en vigueur mais nous vous recommandons de vérifier la conformité avec votre situation fiscale spécifique.

**Développé avec ❤️ pour les micro-entrepreneurs français**

---

⭐ **Si ce projet vous aide, n'hésitez pas à lui donner une étoile !** ⭐ 