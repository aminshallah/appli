const express = require('express');
const router = express.Router();
const Annonce = require('../models/annonce');

router.get('/' + '', async (req, res) => {
    try {
        const annonces = await Annonce.find();
        res.json({ annonces });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
  });

  
router.post('/', async (req, res) => {
    const { genre, title, description, date, from } = req.body;
  
    console.log('Données reçues:', req.body);
  
    // Validation des champs
    if (!date || !title || !from ) {
        return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }
  
    try {
        const newAnnonce = new Annonce({
            genre,
            title,
            date,
            description,
            from
        });
  
        const savedAnnonce = await newAnnonce.save();
        res.status(201).json({ id: savedAnnonce._id, name: savedAnnonce.name, description: savedAnnonce.description });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;