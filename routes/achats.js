const express = require('express');
const Achat = require('../models/Achat');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Récupérer tous les achats de l'utilisateur
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 20, categorie, dateDebut, dateFin } = req.query;
    
    const filter = { userId: req.user._id };
    
    if (categorie) filter.categorie = categorie;
    if (dateDebut || dateFin) {
      filter.date = {};
      if (dateDebut) filter.date.$gte = new Date(dateDebut);
      if (dateFin) filter.date.$lte = new Date(dateFin);
    }

    const achats = await Achat.find(filter)
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Achat.countDocuments(filter);

    res.json({
      success: true,
      data: achats,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des achats:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des achats' });
  }
});

// Récupérer un achat spécifique
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const achat = await Achat.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!achat) {
      return res.status(404).json({ error: 'Achat non trouvé' });
    }

    res.json(achat);

  } catch (error) {
    console.error('Erreur lors de la récupération de l\'achat:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'achat' });
  }
});

// Créer un nouvel achat
router.post('/', authenticateToken, async (req, res) => {
  try {
    const achatData = {
      ...req.body,
      userId: req.user._id
    };

    const achat = new Achat(achatData);
    await achat.save();

    res.status(201).json({
      message: 'Achat créé avec succès',
      achat
    });

  } catch (error) {
    console.error('Erreur lors de la création de l\'achat:', error);
    res.status(500).json({ error: 'Erreur lors de la création de l\'achat' });
  }
});

// Mettre à jour un achat
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const achat = await Achat.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user._id
      },
      req.body,
      { new: true, runValidators: true }
    );

    if (!achat) {
      return res.status(404).json({ error: 'Achat non trouvé' });
    }

    res.json({
      message: 'Achat mis à jour avec succès',
      achat
    });

  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'achat:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'achat' });
  }
});

// Supprimer un achat
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const achat = await Achat.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!achat) {
      return res.status(404).json({ error: 'Achat non trouvé' });
    }

    res.json({ message: 'Achat supprimé avec succès' });

  } catch (error) {
    console.error('Erreur lors de la suppression de l\'achat:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'achat' });
  }
});

// Statistiques des achats
router.get('/stats/summary', authenticateToken, async (req, res) => {
  try {
    const { dateDebut, dateFin } = req.query;
    
    const filter = { userId: req.user._id };
    if (dateDebut || dateFin) {
      filter.date = {};
      if (dateDebut) filter.date.$gte = new Date(dateDebut);
      if (dateFin) filter.date.$lte = new Date(dateFin);
    }

    const stats = await Achat.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          totalAchats: { $sum: 1 },
          totalMontant: { $sum: '$montantTTC' },
          totalHT: { $sum: '$montantHT' },
          totalTVA: { $sum: '$montantTVA' },
          moyenneMontant: { $avg: '$montantTTC' }
        }
      }
    ]);

    const statsParCategorie = await Achat.aggregate([
      { $match: filter },
      {
        $group: {
          _id: '$categorie',
          count: { $sum: 1 },
          totalMontant: { $sum: '$montantTTC' }
        }
      }
    ]);

    const statsParMois = await Achat.aggregate([
      { $match: filter },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' }
          },
          count: { $sum: 1 },
          totalMontant: { $sum: '$montantTTC' }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } }
    ]);

    res.json({
      summary: stats[0] || {
        totalAchats: 0,
        totalMontant: 0,
        totalHT: 0,
        totalTVA: 0,
        moyenneMontant: 0
      },
      parCategorie: statsParCategorie,
      parMois: statsParMois
    });

  } catch (error) {
    console.error('Erreur lors du calcul des statistiques:', error);
    res.status(500).json({ error: 'Erreur lors du calcul des statistiques' });
  }
});

module.exports = router; 