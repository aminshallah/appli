const mongoose = require('mongoose');

const annonceSchema = new mongoose.Schema({
    genre: { type: String, required: false },
    title: { type: String, required: true },
    description: { type: String, required: false },
    from : {type : String, required: true},
    date: { type: Date, required: true }
});

module.exports = mongoose.model('Annonce', annonceSchema);