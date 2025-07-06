// Exemple de configuration - Copier ce fichier en config.js et remplir vos informations
const CONFIG = {
  // Statut juridique
  statutJuridique: "micro", // "micro" ou "sasu"
  
  // Informations émetteur
  emetteurNom: "VOTRE_NOM_ENTREPRISE",
  emetteurContact: "VOTRE_NOM_PRENOM",
  emetteurAdresse: "VOTRE_ADRESSE\nVOTRE_CODE_POSTAL VOTRE_VILLE",
  emetteurSiret: "VOTRE_SIRET",
  emetteurRcs: "VOTRE_RCS_OU_DISPENSE",
  emetteurEmail: "votre.email@exemple.com",
  emetteurTel: "VOTRE_TELEPHONE",
  
  // Informations spécifiques SASU (optionnel si statutJuridique = "sasu")
  capitalSocial: "1000", // Capital social en euros
  numTva: "FR12345678901", // N° TVA intracommunautaire
  dateCreationSasu: "2024-01-01", // Date de création de la SASU
  
  // Informations bancaires
  iban: "VOTRE_IBAN",
  bic: "VOTRE_BIC",
  banque: "NOM_DE_VOTRE_BANQUE"
};

// Export pour utilisation dans le HTML
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
} 