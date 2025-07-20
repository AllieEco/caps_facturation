const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware de sécurité avec CSP personnalisé
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net", "https://cdnjs.cloudflare.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      scriptSrcAttr: ["'unsafe-inline'"]
    }
  }
}));
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static('.'));

// Middleware pour gérer les erreurs de parsing JSON
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('=== ERREUR JSON DÉTECTÉE ===');
    console.error('Erreur de parsing JSON:', err.message);
    console.error('URL de la requête:', req.url);
    console.error('Méthode:', req.method);
    console.error('Content-Type:', req.headers['content-type']);
    console.error('Body brut:', req.body);
    console.error('============================');
    
    // Retourner une réponse plus détaillée
    return res.status(400).json({ 
      error: 'Données JSON invalides',
      message: 'Le format des données envoyées n\'est pas valide',
      details: err.message
    });
  }
  next();
});

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limite chaque IP à 100 requêtes par fenêtre
});
app.use('/api/', limiter);

// Connexion MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/caps_fact', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connexion MongoDB établie'))
.catch(err => console.error('❌ Erreur connexion MongoDB:', err));

// Import des modèles
const User = require('./models/User');
const Facture = require('./models/Facture');
const Recette = require('./models/Recette');
const Achat = require('./models/Achat');

// Routes API
app.use('/api/auth', require('./routes/auth'));
app.use('/api/factures', require('./routes/factures'));
app.use('/api/recettes', require('./routes/recettes'));
app.use('/api/achats', require('./routes/achats'));

// Route de test
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Serveur CAPS FACT opérationnel' });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erreur serveur interne' });
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`📊 Dashboard disponible sur http://localhost:${PORT}`);
}); 