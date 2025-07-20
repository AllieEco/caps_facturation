const mongoose = require('mongoose');

const achatSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  montant: {
    type: Number,
    required: true,
    min: 0
  },
  categorie: {
    type: String,
    enum: ['fournitures', 'equipement', 'logiciels', 'services', 'marketing', 'transport', 'autre'],
    default: 'fournitures'
  },
  fournisseur: {
    nom: String,
    email: String,
    telephone: String,
    siret: String
  },
  modePaiement: {
    type: String,
    enum: ['virement', 'chèque', 'espèces', 'carte', 'paypal'],
    default: 'virement'
  },
  factureFournisseur: String,
  tva: {
    type: Number,
    default: 20,
    min: 0
  },
  montantHT: {
    type: Number,
    required: true,
    min: 0
  },
  montantTVA: {
    type: Number,
    required: true,
    min: 0
  },
  montantTTC: {
    type: Number,
    required: true,
    min: 0
  },
  statut: {
    type: String,
    enum: ['en_attente', 'payée', 'annulée'],
    default: 'payée'
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
achatSchema.index({ userId: 1, categorie: 1 });

module.exports = mongoose.model('Achat', achatSchema); 