const express = require('express');
const Facture = require('../models/Facture');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Récupérer toutes les factures de l'utilisateur
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 20, statut, dateDebut, dateFin } = req.query;
    
    const filter = { userId: req.user._id };
    
    if (statut) filter.statut = statut;
    if (dateDebut || dateFin) {
      filter.date = {};
      if (dateDebut) filter.date.$gte = new Date(dateDebut);
      if (dateFin) filter.date.$lte = new Date(dateFin);
    }

    const factures = await Facture.find(filter)
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Facture.countDocuments(filter);

    res.json({
      factures,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des factures:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des factures' });
  }
});

// Récupérer une facture spécifique
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const facture = await Facture.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!facture) {
      return res.status(404).json({ error: 'Facture non trouvée' });
    }

    res.json(facture);

  } catch (error) {
    console.error('Erreur lors de la récupération de la facture:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de la facture' });
  }
});

// Créer une nouvelle facture
router.post('/', authenticateToken, async (req, res) => {
  try {
    const factureData = {
      ...req.body,
      userId: req.user._id
    };

    const facture = new Facture(factureData);
    await facture.save();

    res.status(201).json({
      message: 'Facture créée avec succès',
      facture
    });

  } catch (error) {
    console.error('Erreur lors de la création de la facture:', error);
    res.status(500).json({ error: 'Erreur lors de la création de la facture' });
  }
});

// Mettre à jour une facture
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const facture = await Facture.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user._id
      },
      req.body,
      { new: true, runValidators: true }
    );

    if (!facture) {
      return res.status(404).json({ error: 'Facture non trouvée' });
    }

    res.json({
      message: 'Facture mise à jour avec succès',
      facture
    });

  } catch (error) {
    console.error('Erreur lors de la mise à jour de la facture:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la facture' });
  }
});

// Supprimer une facture
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const facture = await Facture.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!facture) {
      return res.status(404).json({ error: 'Facture non trouvée' });
    }

    res.json({ message: 'Facture supprimée avec succès' });

  } catch (error) {
    console.error('Erreur lors de la suppression de la facture:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression de la facture' });
  }
});

// Statistiques des factures
router.get('/stats/summary', authenticateToken, async (req, res) => {
  try {
    const { dateDebut, dateFin } = req.query;
    
    const filter = { userId: req.user._id };
    if (dateDebut || dateFin) {
      filter.date = {};
      if (dateDebut) filter.date.$gte = new Date(dateDebut);
      if (dateFin) filter.date.$lte = new Date(dateFin);
    }

    const stats = await Facture.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          totalFactures: { $sum: 1 },
          totalMontant: { $sum: '$totalTTC' },
          totalHT: { $sum: '$totalHT' },
          totalTVA: { $sum: '$totalTVA' },
          moyenneMontant: { $avg: '$totalTTC' }
        }
      }
    ]);

    const statsParStatut = await Facture.aggregate([
      { $match: filter },
      {
        $group: {
          _id: '$statut',
          count: { $sum: 1 },
          totalMontant: { $sum: '$totalTTC' }
        }
      }
    ]);

    const statsParMois = await Facture.aggregate([
      { $match: filter },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' }
          },
          count: { $sum: 1 },
          totalMontant: { $sum: '$totalTTC' }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } }
    ]);

    res.json({
      summary: stats[0] || {
        totalFactures: 0,
        totalMontant: 0,
        totalHT: 0,
        totalTVA: 0,
        moyenneMontant: 0
      },
      parStatut: statsParStatut,
      parMois: statsParMois
    });

  } catch (error) {
    console.error('Erreur lors du calcul des statistiques:', error);
    res.status(500).json({ error: 'Erreur lors du calcul des statistiques' });
  }
});

module.exports = router; 