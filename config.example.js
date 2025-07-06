// Exemple de configuration - Copier ce fichier en config.js et remplir vos informations
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

// Export pour utilisation dans le HTML
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
} 