const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    genre: { type: String, required: true },
    name: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    duration: { type: Number, required: true },
    description: { type: String, required: false },
});

module.exports = mongoose.model('Event', eventSchema);