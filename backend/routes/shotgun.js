const express = require('express');
const router = express.Router();

const Shotgun = require('../models/shotgun');

router.post('/', (req, res, next) => {
    delete req.body._id;
    const shotgun = new Shotgun({
        ...req.body
    });
    shotgun.save()
    .then(() => res.status(201).json({ message: 'shotgun créé'}))
    .catch(error => res.status(400).json({ error }));
});

router.get('/' + '', (req, res, next) => {
    Shotgun.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
});

router.get('/:id', (req, res, next) => {
    Shotgun.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
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

module.exports = router;