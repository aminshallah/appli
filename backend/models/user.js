const mongoose = require('mongoose');

const familySchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  chef: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  shotgun: { type: Boolean, required: true, default: false }, //shotgun reussi ou pas 
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Boolean, required: true, default: true }, // majeur ou pas attention pour l'instant a maj manuellement
  family: { type: mongoose.Schema.Types.ObjectId, ref: 'Family' },
  role: { type: String, enum: ['user', 'admin', 'pcs' ], default: 'user' }, //pcs peut changer les gens de famille et le chef d'une famille
  chef: { type: Boolean, default: false }, //peut shotgun ou pas
});

const Family = mongoose.model('Family', familySchema);
const User = mongoose.model('User', userSchema);

module.exports = { Family, User };