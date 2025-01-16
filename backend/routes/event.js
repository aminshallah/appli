const express = require('express');
const router = express.Router();

const Event = require('../models/event');

router.get('/' + '', async (req, res) => {
    try {
        const events = await Event.find();
        res.json({ events });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
  });
  
router.post('/', async (req, res) => {
    const { genre, name, date, location, startTime, endTime, duration, description } = req.body;
  
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
        });
  
        const savedEvent = await newEvent.save();
        res.status(201).json({ id: savedEvent._id, name: savedEvent.name, description: savedEvent.description });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;