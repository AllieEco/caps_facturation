const mongoose = require('mongoose');

const recetteSchema = new mongoose.Schema({
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
    enum: ['vente', 'service', 'consultation', 'formation', 'autre'],
    default: 'vente'
  },
  modePaiement: {
    type: String,
    enum: ['virement', 'chèque', 'espèces', 'carte', 'paypal'],
    default: 'virement'
  },
  client: {
    nom: String,
    email: String,
    telephone: String
  },
  factureAssociee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Facture'
  },
  notes: String,
  statut: {
    type: String,
    enum: ['en_attente', 'payée', 'annulée'],
    default: 'payée'
  },
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
recetteSchema.index({ userId: 1, categorie: 1 });

module.exports = mongoose.model('Recette', recetteSchema); 