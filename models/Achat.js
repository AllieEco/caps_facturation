const mongoose = require('mongoose');

const achatSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  numeroFacture: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  montantHT: {
    type: Number,
    required: true,
    min: 0
  },
  tauxTVA: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
    default: 20
  },
  montantTVA: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  montantTTC: {
    type: Number,
    required: true,
    min: 0
  },
  fournisseur: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  typePrestation: {
    type: String,
    enum: ['bien', 'service'],
    required: true
  },
  typeDepense: {
    type: String,
    enum: ['achat_materiel', 'fournitures_bureau', 'logiciels', 'services_web', 'telecommunications', 'transport', 'restauration', 'formation', 'marketing', 'assurance', 'comptabilite', 'maintenance', 'loyer', 'energie', 'autres'],
    required: false,
    default: 'autres'
  },
  modePaiement: {
    type: String,
    enum: ['virement', 'cheque', 'carte', 'espece', 'paypal'],
    required: true
  },
  notes: String,
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
achatSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index pour améliorer les performances
achatSchema.index({ userId: 1, date: -1 });
achatSchema.index({ userId: 1, fournisseur: 1 });

module.exports = mongoose.model('Achat', achatSchema); 