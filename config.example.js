// Exemple de configuration - Copier ce fichier en config.js et remplir vos informations
const CONFIG = {
  // Statut juridique
  statutJuridique: "micro", // "micro", "sasu" ou "eurl"
  
  // Informations émetteur
  emetteurNom: "VOTRE_NOM_ENTREPRISE",
  emetteurContact: "VOTRE_NOM_PRENOM",
  emetteurAdresse: "VOTRE_ADRESSE",
  emetteurCodePostal: "VOTRE_CODE_POSTAL",
  emetteurVille: "VOTRE_VILLE",
  emetteurSiret: "VOTRE_SIRET",
  emetteurRcs: "VOTRE_RCS_OU_DISPENSE",
  emetteurVilleRcs: "VOTRE_VILLE_RCS",
  microAUnRcs: false, // true si la micro-entreprise a un RCS (commerce), false si dispensée (services)
  emetteurEmail: "votre.email@exemple.com",
  emetteurTel: "VOTRE_TELEPHONE",
  
  // Logo de l'entreprise (optionnel)
  // logoEntreprise: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...", // Base64 de votre logo
  
  // Informations spécifiques SASU (optionnel si statutJuridique = "sasu")
  capitalSocial: "1000", // Capital social en euros
  numTva: "FR12345678901", // N° TVA intracommunautaire
  dateCreationSasu: "2024-01-01", // Date de création de la SASU
  
  // Informations spécifiques EURL (optionnel si statutJuridique = "eurl")
  capitalSocialEurl: "1000", // Capital social EURL en euros
  numTvaEurl: "FR12345678901", // N° TVA intracommunautaire EURL
  dateCreationEurl: "2024-01-01", // Date de création de l'EURL
  gerantEurl: "VOTRE_NOM_GERANT", // Nom du gérant
  associeUniqueEurl: "VOTRE_NOM_ASSOCIE", // Nom de l'associé unique
  
  // Informations bancaires
  iban: "VOTRE_IBAN",
  bic: "VOTRE_BIC",
  banque: "NOM_DE_VOTRE_BANQUE"
};

// Export pour utilisation dans le HTML
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
} 