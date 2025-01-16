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

module.exports = router;