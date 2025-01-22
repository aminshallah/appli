const express = require('express');
const router = express.Router();

const Shotgun = require('../models/shotgun');
const { Family } = require('../models/user');

router.post('/', (req, res, next) => {
    delete req.body._id;
    const shotgun = new Shotgun({
        ...req.body
    });
    shotgun.save()
    .then(() => res.status(201).json({ message: 'shotgun créé'}))
    .catch(error => res.status(400).json({ error }));
});

router.get('/current', async (req, res) => {
  try {
    // Recherche du shotgun avec currentShotgun égal à true
    const shotgunActif = await Shotgun.findOne({ currentShotgun: true });
    if (!shotgunActif) {
      return res.status(404).json({ error: "Il n'y a pas de shotgun actif." });
    }

    return res.status(200).json(shotgunActif);
  } catch (error) {
    console.error("Erreur lors de la récupération du shotgun actif :", error);
    return res.status(500).json({ error: "Une erreur est survenue lors de la récupération du shotgun actif." });
  }
});

router.get('/', (req, res, next) => {
    Shotgun.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
});

router.get('/:id', (req, res, next) => {
    Shotgun.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
});


router.post('/:id/reserve', async (req, res) => {
  const { id } = req.params; // ID du shotgun à mettre à jour
  const { familyId } = req.body; // ID de la famille à rechercher pour obtenir ses membres

  if (!familyId) {
    return res.status(400).json({ error: "L'ID de la famille doit être fourni." });
  }

  try {
    // Récupérer le shotgun par son ID
    const shotgun = await Shotgun.findById(id);
    if (!shotgun) {
      return res.status(404).json({ error: "Shotgun non trouvé." });
    }

    // Trouver la famille en fonction de l'ID de la famille
    const family = await Family.findById(familyId);
    if (!family) {
      return res.status(404).json({ error: "Famille non trouvée." });
    }
    if (family.shotgun) {
      return res.status(400).json({ error: "Vous avez déjà réussi le shotgun, rafraichissez !" });
    }

    // Vérifier si la famille a des membres
    if (!family.members || family.members.length === 0) {
      return res.status(400).json({ error: "La famille n'a pas de membres à ajouter." });
    }

    // Calculer le nombre total de participants après ajout
    const newParticipants = [...new Set([...shotgun.participants, ...family.members])];

    if (newParticipants.length > shotgun.places) {
      // Si le nombre de participants dépasse le nombre de places disponibles, annuler l'ajout
      return res.status(400).json({
        error: `Plus de places désolés !`
      });
    }

    // Ajouter les membres de la famille dans le tableau 'participants' du shotgun
    shotgun.participants = newParticipants;
    family.shotgun = true;

    // Sauvegarder les modifications du shotgun
    await shotgun.save();
    await family.save()

    return res.status(200).json({
      message: "Les membres de la famille ont été ajoutés avec succès au shotgun.",
      participants: shotgun.participants
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour des participants :", error);
    return res.status(500).json({ error: "Une erreur est survenue lors de l'ajout des membres de la famille." });
  }
});

router.put('/current', async (req, res) => {

    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ error: "L'ID du shotgun doit être fourni." });
    }
      
    try {
      await Shotgun.updateMany({}, { $set: { currentShotgun: false } });
  
      const updatedShotgun = await Shotgun.findByIdAndUpdate(
        id,
        { $set: { currentShotgun: true } },
        { new: true } // Retourne le document mis à jour
      );
  
      if (!updatedShotgun) {
        return res.status(404).json({ error: "Shotgun avec l'ID spécifié introuvable." });
      }
  
      return res.status(200).json({
        message: "Le shotgun actuel a été mis à jour avec succès.",
        updatedShotgun,
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour des shotguns :", error);
      return res.status(500).json({ error: "Une erreur est survenue lors de la mise à jour des shotguns." });
    }
  });  

router.put('/:id', (req, res, next) => {
    Shotgun.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'shotgun modifié' }))
    .catch(error => res.status(400).json({ error }));
});

router.delete('/:id', (req, res, next) => {
    Shotgun.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'shotgun supprimé'}))
    .catch(error => res.status(400).json({ error }));
});


module.exports = router;