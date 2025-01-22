const mongoose = require('mongoose');

const shotgunSchema = mongoose.Schema({
    nom: {type: String, required: true},
    description: {type: String, required: false, default: ''},
    places: {type: Number, required: true},
    participants: {type: Array, required: false},
    currentShotgun: {type: Boolean, default: false},
    date: {type: Date, required: true},
});

module.exports = mongoose.model('Shotgun', shotgunSchema);