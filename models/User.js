const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  nom: {
    type: String,
    required: true,
    trim: true
  },
  entreprise: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  config: {
    statutJuridique: {
      type: String,
      enum: ['micro', 'sasu', 'eurl', 'sarl'],
      default: 'micro'
    },
    emetteurNom: String,
    emetteurContact: String,
    emetteurAdresse: String,
    emetteurCodePostal: String,
    emetteurVille: String,
    emetteurSiret: String,
    emetteurRcs: String,
    emetteurVilleRcs: String,
    microAUnRcs: {
      type: Boolean,
      default: false
    },
    emetteurEmail: String,
    emetteurTel: String,
    capitalSocial: String,
    numTva: String,
    dateCreationSasu: String,
    capitalSocialEurl: String,
    numTvaEurl: String,
    dateCreationEurl: String,
    gerantEurl: String,
    associeUniqueEurl: String,
    capitalSocialSarl: String,
    numTvaSarl: String,
    dateCreationSarl: String,
    gerantSarl: String,
    associesSarl: String,
    iban: String,
    bic: String,
    banque: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
});

// Hash du mot de passe avant sauvegarde
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_ROUNDS) || 12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Méthode pour comparer les mots de passe
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Méthode pour obtenir les données publiques de l'utilisateur
userSchema.methods.toPublicJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('User', userSchema); 