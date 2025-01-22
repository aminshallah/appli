const express = require('express');
const router = express.Router();
const Event = require('../models/event');

// Middleware d'authentification (exemple simplifié)
const authenticate = (req, res, next) => {
    // Simule une vérification du token ou de l'utilisateur connecté
    // Ajoutez votre logique d'authentification ici
    next();
  };

router.get('/all' + '', async (req, res) => {
    try {
        const events = await Event.find();
        res.json({ events });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
  });


  router.get('/byId/:id', async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) {
        return res.status(404).json({ message: 'Événement introuvable' });
      }
      res.status(200).json(event);
    } catch (err) {
      res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
  });

  router.get('/by-date', async (req, res) => {
    const { date } = req.query; // La date est envoyée comme paramètre de requête
    if (!date) {
        return res.status(400).json({ error: 'Une date est requise.' });
    }

    try {
        const givenDate = new Date(date);
        const nextDay = new Date(givenDate);
        nextDay.setDate(givenDate.getDate() + 1);

        const events = await Event.find({
            date: {
                $gte: givenDate,
                $lt: nextDay
            }
        });

        res.json({ events });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
  
router.post('/', async (req, res) => {
    const { genre, name, date, location, startTime, endTime, duration, description, asso } = req.body;
  
    console.log('Données reçues:', req.body);
  
    // Validation des champs
    if (!genre || !name || !date || !location || !startTime || !endTime || !duration) {
        return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }
  
    try {
        const newEvent = new Event({
            genre,
            name,
            date,
            location,
            startTime,
            endTime,
            duration,
            description,
            asso
        });
  
        const savedEvent = await newEvent.save();
        res.status(201).json({ id: savedEvent._id, name: savedEvent.name, description: savedEvent.description });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;