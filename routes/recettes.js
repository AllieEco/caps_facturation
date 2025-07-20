const express = require('express');
const Recette = require('../models/Recette');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Récupérer toutes les recettes de l'utilisateur
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

    const recettes = await Recette.find(filter)
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Recette.countDocuments(filter);

    res.json({
      recettes,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des recettes:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des recettes' });
  }
});

// Récupérer une recette spécifique
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const recette = await Recette.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!recette) {
      return res.status(404).json({ error: 'Recette non trouvée' });
    }

    res.json(recette);

  } catch (error) {
    console.error('Erreur lors de la récupération de la recette:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de la recette' });
  }
});

// Créer une nouvelle recette
router.post('/', authenticateToken, async (req, res) => {
  try {
    const recetteData = {
      ...req.body,
      userId: req.user._id
    };

    const recette = new Recette(recetteData);
    await recette.save();

    res.status(201).json({
      message: 'Recette créée avec succès',
      recette
    });

  } catch (error) {
    console.error('Erreur lors de la création de la recette:', error);
    res.status(500).json({ error: 'Erreur lors de la création de la recette' });
  }
});

// Mettre à jour une recette
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const recette = await Recette.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user._id
      },
      req.body,
      { new: true, runValidators: true }
    );

    if (!recette) {
      return res.status(404).json({ error: 'Recette non trouvée' });
    }

    res.json({
      message: 'Recette mise à jour avec succès',
      recette
    });

  } catch (error) {
    console.error('Erreur lors de la mise à jour de la recette:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la recette' });
  }
});

// Supprimer une recette
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const recette = await Recette.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!recette) {
      return res.status(404).json({ error: 'Recette non trouvée' });
    }

    res.json({ message: 'Recette supprimée avec succès' });

  } catch (error) {
    console.error('Erreur lors de la suppression de la recette:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression de la recette' });
  }
});

// Statistiques des recettes
router.get('/stats/summary', authenticateToken, async (req, res) => {
  try {
    const { dateDebut, dateFin } = req.query;
    
    const filter = { userId: req.user._id };
    if (dateDebut || dateFin) {
      filter.date = {};
      if (dateDebut) filter.date.$gte = new Date(dateDebut);
      if (dateFin) filter.date.$lte = new Date(dateFin);
    }

    const stats = await Recette.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          totalRecettes: { $sum: 1 },
          totalMontant: { $sum: '$montant' },
          moyenneMontant: { $avg: '$montant' }
        }
      }
    ]);

    const statsParCategorie = await Recette.aggregate([
      { $match: filter },
      {
        $group: {
          _id: '$categorie',
          count: { $sum: 1 },
          totalMontant: { $sum: '$montant' }
        }
      }
    ]);

    const statsParMois = await Recette.aggregate([
      { $match: filter },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' }
          },
          count: { $sum: 1 },
          totalMontant: { $sum: '$montant' }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } }
    ]);

    res.json({
      summary: stats[0] || {
        totalRecettes: 0,
        totalMontant: 0,
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