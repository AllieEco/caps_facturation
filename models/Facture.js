const mongoose = require('mongoose');

const factureSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  numero: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  client: {
    nom: {
      type: String,
      required: true
    },
    adresse: String,
    codePostal: String,
    ville: String,
    email: String,
    telephone: String,
    siret: String
  },
  articles: [{
    description: {
      type: String,
      required: true
    },
    quantite: {
      type: Number,
      required: true,
      min: 0
    },
    prixUnitaire: {
      type: Number,
      required: true,
      min: 0
    },
    tva: {
      type: Number,
      default: 20,
      min: 0
    }
  }],
  totalHT: {
    type: Number,
    required: true,
    min: 0
  },
  totalTVA: {
    type: Number,
    required: true,
    min: 0
  },
  totalTTC: {
    type: Number,
    required: true,
    min: 0
  },
  statut: {
    type: String,
    enum: ['brouillon', 'envoyée', 'payée', 'annulée'],
    default: 'brouillon'
  },
  modePaiement: {
    type: String,
    enum: ['virement', 'chèque', 'espèces', 'carte'],
    default: 'virement'
  },
  dateEcheance: Date,
  notes: String,
  pdfData: String, // Base64 du PDF généré
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Mise à jour automatique de updatedAt
factureSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index pour améliorer les performances
factureSchema.index({ userId: 1, date: -1 });
factureSchema.index({ userId: 1, numero: 1 });

module.exports = mongoose.model('Facture', factureSchema); 