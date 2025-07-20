const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware pour vérifier le token JWT
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ error: 'Token d\'accès requis' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: 'Utilisateur non trouvé' });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Token invalide' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expiré' });
    }
    res.status(500).json({ error: 'Erreur d\'authentification' });
  }
};

// Middleware pour vérifier les permissions admin
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Accès refusé - Droits administrateur requis' });
  }
  next();
};

// Middleware pour vérifier que l'utilisateur accède à ses propres données
const checkOwnership = (req, res, next) => {
  const resourceUserId = req.params.userId || req.body.userId;
  
  if (req.user.role === 'admin') {
    return next(); // Les admins peuvent accéder à tout
  }
  
  if (resourceUserId && resourceUserId !== req.user._id.toString()) {
    return res.status(403).json({ error: 'Accès refusé - Vous ne pouvez accéder qu\'à vos propres données' });
  }
  
  next();
};

module.exports = {
  authenticateToken,
  requireAdmin,
  checkOwnership
}; 