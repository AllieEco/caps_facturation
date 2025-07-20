const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Inscription d'un nouvel utilisateur
router.post('/register', async (req, res) => {
  try {
    const { email, password, nom, entreprise, config } = req.body;

    // Vérification des champs requis
    if (!email || !password || !nom || !entreprise) {
      return res.status(400).json({ error: 'Tous les champs sont requis' });
    }

    // Vérification si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Un utilisateur avec cet email existe déjà' });
    }

    // Création du nouvel utilisateur
    const user = new User({
      email,
      password,
      nom,
      entreprise,
      config: config || {}
    });

    await user.save();

    // Génération du token JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    res.status(201).json({
      message: 'Utilisateur créé avec succès',
      token,
      user: user.toPublicJSON()
    });

  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({ error: 'Erreur lors de la création du compte' });
  }
});

// Connexion utilisateur
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérification des champs requis
    if (!email || !password) {
      return res.status(400).json({ error: 'Email et mot de passe requis' });
    }

    // Recherche de l'utilisateur
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    // Vérification du mot de passe
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    // Mise à jour de la dernière connexion
    user.lastLogin = Date.now();
    await user.save();

    // Génération du token JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    res.json({
      message: 'Connexion réussie',
      token,
      user: user.toPublicJSON()
    });

  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).json({ error: 'Erreur lors de la connexion' });
  }
});

// Récupération du profil utilisateur
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    res.json({
      user: req.user.toPublicJSON()
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du profil' });
  }
});

// Récupération des informations utilisateur connecté
router.get('/me', authenticateToken, async (req, res) => {
  try {
    res.json(req.user.toPublicJSON());
  } catch (error) {
    console.error('Erreur lors de la récupération des informations utilisateur:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des informations' });
  }
});

// Mise à jour du profil utilisateur
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { nom, entreprise, config } = req.body;
    const updates = {};

    if (nom) updates.nom = nom;
    if (entreprise) updates.entreprise = entreprise;
    if (config) updates.config = { ...req.user.config, ...config };

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Profil mis à jour avec succès',
      user: user.toPublicJSON()
    });

  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du profil' });
  }
});

// Mise à jour complète du profil avec informations d'entreprise
router.put('/update-profile', authenticateToken, async (req, res) => {
  try {
    const {
      nom, entreprise, statutJuridique,
      emetteurNom, emetteurContact, emetteurAdresse, emetteurCodePostal, emetteurVille,
      emetteurSiret, emetteurRcs, emetteurVilleRcs, microAUnRcs,
      emetteurEmail, emetteurTel, numTva,
      capitalSocial, dateCreationSasu,
      capitalSocialEurl, dateCreationEurl, gerantEurl, associeUniqueEurl,
      capitalSocialSarl, dateCreationSarl, gerantSarl, associesSarl,
      iban, bic, banque
    } = req.body;

    const updates = {};
    
    // Mise à jour des informations de base
    if (nom) updates.nom = nom;
    if (entreprise) updates.entreprise = entreprise;
    
    // Mise à jour de la configuration
    const configUpdates = {};
    if (statutJuridique) configUpdates.statutJuridique = statutJuridique;
    if (emetteurNom) configUpdates.emetteurNom = emetteurNom;
    if (emetteurContact) configUpdates.emetteurContact = emetteurContact;
    if (emetteurAdresse) configUpdates.emetteurAdresse = emetteurAdresse;
    if (emetteurCodePostal) configUpdates.emetteurCodePostal = emetteurCodePostal;
    if (emetteurVille) configUpdates.emetteurVille = emetteurVille;
    if (emetteurSiret) configUpdates.emetteurSiret = emetteurSiret;
    if (emetteurRcs) configUpdates.emetteurRcs = emetteurRcs;
    if (emetteurVilleRcs) configUpdates.emetteurVilleRcs = emetteurVilleRcs;
    if (typeof microAUnRcs === 'boolean') configUpdates.microAUnRcs = microAUnRcs;
    if (emetteurEmail) configUpdates.emetteurEmail = emetteurEmail;
    if (emetteurTel) configUpdates.emetteurTel = emetteurTel;
    if (numTva) configUpdates.numTva = numTva;
    if (iban) configUpdates.iban = iban;
    if (bic) configUpdates.bic = bic;
    if (banque) configUpdates.banque = banque;
    
    // Informations spécifiques selon le statut juridique
    if (capitalSocial) configUpdates.capitalSocial = capitalSocial;
    if (dateCreationSasu) configUpdates.dateCreationSasu = dateCreationSasu;
    if (capitalSocialEurl) configUpdates.capitalSocialEurl = capitalSocialEurl;
    if (dateCreationEurl) configUpdates.dateCreationEurl = dateCreationEurl;
    if (gerantEurl) configUpdates.gerantEurl = gerantEurl;
    if (associeUniqueEurl) configUpdates.associeUniqueEurl = associeUniqueEurl;
    if (capitalSocialSarl) configUpdates.capitalSocialSarl = capitalSocialSarl;
    if (dateCreationSarl) configUpdates.dateCreationSarl = dateCreationSarl;
    if (gerantSarl) configUpdates.gerantSarl = gerantSarl;
    if (associesSarl) configUpdates.associesSarl = associesSarl;

    // Fusion avec la configuration existante
    updates.config = { ...req.user.config, ...configUpdates };

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Profil mis à jour avec succès',
      user: user.toPublicJSON()
    });

  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du profil' });
  }
});

// Changement de mot de passe
router.put('/change-password', authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Ancien et nouveau mot de passe requis' });
    }

    // Vérification de l'ancien mot de passe
    const isCurrentPasswordValid = await req.user.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({ error: 'Ancien mot de passe incorrect' });
    }

    // Mise à jour du mot de passe
    req.user.password = newPassword;
    await req.user.save();

    res.json({ message: 'Mot de passe modifié avec succès' });

  } catch (error) {
    console.error('Erreur lors du changement de mot de passe:', error);
    res.status(500).json({ error: 'Erreur lors du changement de mot de passe' });
  }
});

module.exports = router; 