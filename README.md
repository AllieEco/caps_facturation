# Générateur de Factures Multi-Statuts 

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/AllieEco/caps_facturation.svg?style=social)](https://github.com/AllieEco/caps_facturation/stargazers)

Un générateur de factures **polyvalent** pour les entrepreneurs français. Simple, gratuit et 100% adapté aux différents statuts juridiques.

## ✨ Pourquoi ce générateur ?

Ce générateur a été créé spécifiquement pour répondre aux besoins des **entrepreneurs français** :

- ✅ **Multi-statuts** - Supporte les micro-entreprises, SASU ET EURL
- ✅ **Gestion TVA intelligente** - Pas de TVA pour les micro-entreprises, calcul automatique TVA 20% pour les SASU et EURL
- ✅ **Mentions légales conformes** - Toutes les mentions obligatoires selon le statut choisi
- ✅ **Simple et rapide** - Aucune installation, fonctionne dans votre navigateur
- ✅ **Gratuit à vie** - Pas d'abonnement, pas de limitations
- ✅ **Données privées** - Vos informations restent sur votre ordinateur

## 🚀 Fonctionnalités

- **Interface moderne et intuitive** - Créez vos factures en quelques clics
- **Multi-statuts juridiques** - Micro-entreprise, SASU et EURL supportés
- **Génération PDF instantanée** - Factures prêtes à envoyer
- **Calcul automatique intelligent** - TVA automatique selon le statut choisi
- **Gestion des prestations multiples** - Ajoutez autant de lignes que nécessaire
- **Conformité légale totale** - Toutes les mentions obligatoires selon le statut
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

### 2. Configurer vos informations d'entreprise

1. **Copiez le fichier de configuration** :
   ```bash
   cp config.example.js config.js
   ```

2. **Remplissez vos informations** dans `config.js` :
   ```javascript
   const CONFIG = {
     // Statut juridique
     statutJuridique: "micro", // "micro", "sasu" ou "eurl"
     
     // Vos informations d'entreprise
     emetteurNom: "Votre Nom ou Raison Sociale",
     emetteurContact: "Votre Prénom NOM",
     emetteurAdresse: "Votre adresse complète\nCode postal Ville",
     emetteurSiret: "Votre numéro SIRET",
     emetteurRcs: "Dispensé d'immatriculation au RCS", // ou votre RCS
     emetteurEmail: "votre.email@exemple.com",
     emetteurTel: "06 12 34 56 78",
     
     // Informations spécifiques SASU (si statutJuridique = "sasu")
     capitalSocial: "1000", // Capital social en euros
     numTva: "FR12345678901", // N° TVA intracommunautaire
     dateCreationSasu: "2024-01-01", // Date de création de la SASU
     
     // Informations spécifiques EURL (si statutJuridique = "eurl")
     capitalSocialEurl: "1000", // Capital social EURL en euros
     numTvaEurl: "FR12345678901", // N° TVA intracommunautaire EURL
     dateCreationEurl: "2024-01-01", // Date de création de l'EURL
     gerantEurl: "Votre Nom Gérant", // Nom du gérant
     associeUniqueEurl: "Votre Nom Associé", // Nom de l'associé unique
     
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

## 📄 Conformité Légale Multi-Statuts

Ce générateur respecte **toutes les obligations légales** selon le statut choisi (micro-entreprise, SASU et EURL) :

### 📋 Micro-Entreprise - Mentions obligatoires incluses :
- ✅ TVA non applicable, art. 293 B du CGI
- ✅ Indemnité forfaitaire de recouvrement (40€)
- ✅ Taux de pénalité de retard (3 fois le taux d'intérêt légal)
- ✅ Modalités de paiement (30 jours)
- ✅ Coordonnées complètes de l'émetteur
- ✅ Numéro SIRET obligatoire
- ✅ Dispense d'immatriculation RCS (si applicable)

### 🏢 SASU - Mentions obligatoires incluses :
- ✅ Capital social de la société
- ✅ Siège social
- ✅ N° TVA intracommunautaire
- ✅ Calcul automatique TVA 20%
- ✅ Informations TVA détaillées
- ✅ Mentions légales SASU spécifiques
- ✅ Date de création de la SASU
- ✅ Numéro RCS Lyon obligatoire

### 🏭 EURL - Mentions obligatoires incluses :
- ✅ Capital social de l'EURL
- ✅ Siège social
- ✅ N° TVA intracommunautaire
- ✅ Calcul automatique TVA 20%
- ✅ Gérant et associé unique
- ✅ Régime réel normal - Déclarations mensuelles
- ✅ TVA sur les débits (facturation)
- ✅ Responsabilité limitée aux apports
- ✅ Mentions légales EURL spécifiques
- ✅ Date de création de l'EURL
- ✅ Numéro RCS Lyon obligatoire

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

## 📜 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 📱 Captures d'écran

![image](https://github.com/user-attachments/assets/6e34f016-4512-42db-ba87-c3ba649b76a9)




---

## ⚖️ Mentions légales

Ce générateur est conçu pour les **entrepreneurs français** (micro-entreprises, SASU et EURL). Il respecte la réglementation en vigueur mais nous vous recommandons de vérifier la conformité avec votre situation fiscale spécifique.

**Développé avec ❤️ pour les entrepreneurs français**

---

⭐ **Si ce projet vous aide, n'hésitez pas à lui donner une étoile !** ⭐ 
