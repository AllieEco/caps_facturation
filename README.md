# Générateur de Factures - CAPSLOCK

Un générateur de factures simple et gratuit pour les micro-entreprises françaises.

## 🚀 Fonctionnalités

- Interface moderne et intuitive
- Génération de factures au format PDF
- Calcul automatique des totaux
- Gestion des prestations multiples
- Conformité légale française (mentions obligatoires)
- Design responsive

## 📋 Prérequis

- Un navigateur web moderne
- Aucune installation requise

## ⚙️ Configuration

### 1. Cloner ou télécharger le projet

```bash
git clone [URL_DU_REPO]
cd caps_fact
```

### 2. Configurer vos informations privées

1. Copiez le fichier `config.example.js` en `config.js` :
   ```bash
   cp config.example.js config.js
   ```

2. Éditez le fichier `config.js` avec vos informations :
   ```javascript
   const CONFIG = {
     // Informations émetteur
     emetteurNom: "VOTRE_NOM_ENTREPRISE",
     emetteurContact: "VOTRE_NOM_PRENOM",
     emetteurAdresse: "VOTRE_ADRESSE\nVOTRE_CODE_POSTAL VOTRE_VILLE",
     emetteurSiret: "VOTRE_SIRET",
     emetteurRcs: "VOTRE_RCS_OU_DISPENSE",
     emetteurEmail: "votre.email@exemple.com",
     emetteurTel: "VOTRE_TELEPHONE",
     
     // Informations bancaires
     iban: "VOTRE_IBAN",
     bic: "VOTRE_BIC",
     banque: "NOM_DE_VOTRE_BANQUE"
   };
   ```

### 3. Ouvrir l'application

Ouvrez simplement le fichier `facture.html` dans votre navigateur web.

## 📝 Utilisation

1. **Remplir les informations client** : Nom, adresse, SIRET (optionnel)
2. **Ajouter les prestations** : Description, prix HT, quantité
3. **Vérifier l'aperçu** : La facture se met à jour en temps réel
4. **Générer le PDF** : Cliquez sur "Imprimer / Enregistrer en PDF"

## 🔒 Sécurité

- Le fichier `config.js` contient vos informations privées
- Il est automatiquement ignoré par Git (voir `.gitignore`)
- Ne partagez jamais ce fichier publiquement

## 📄 Conformité

Le générateur inclut les mentions légales obligatoires pour les factures françaises :
- TVA non applicable (art. 293 B du CGI)
- Indemnité forfaitaire de recouvrement
- Taux de pénalité de retard
- Modalités de paiement

## 🤝 Contribution

Ce projet est open source et gratuit. Les contributions sont les bienvenues !

## 📞 Support

Pour toute question ou problème, n'hésitez pas à ouvrir une issue sur GitHub.

---

**Note** : Ce générateur est conçu pour les micro-entreprises françaises. Vérifiez la conformité avec votre situation fiscale spécifique. 