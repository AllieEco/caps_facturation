const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Route de test
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Serveur CAPS FACT simple opérationnel' });
});

// Route pour servir les fichiers statiques
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur simple démarré sur le port ${PORT}`);
  console.log(`📊 Dashboard disponible sur http://localhost:${PORT}`);
}); 