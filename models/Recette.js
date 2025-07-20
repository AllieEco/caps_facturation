const mongoose = require('mongoose');

const recetteSchema = new mongoose.Schema({
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
  statutJuridique: {
    type: String,
    enum: ['micro', 'sasu', 'eurl', 'sarl'],
    default: 'micro'
  },
  montantHT: {
    type: Number,
    required: true,
    min: 0
  },
  montantTTC: {
    type: Number,
    required: true,
    min: 0
  },
  client: {
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
recetteSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index pour améliorer les performances
recetteSchema.index({ userId: 1, date: -1 });
recetteSchema.index({ userId: 1, statutJuridique: 1 });

module.exports = mongoose.model('Recette', recetteSchema); 