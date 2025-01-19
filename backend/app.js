const express = require('express');
const mongoose = require('mongoose');
const shotgunRoutes = require('./routes/shotgun');
const eventRoutes = require('./routes/event');
const userRoutes = require('./routes/user');

const app = express();
mongoose.connect('mongodb+srv://noe:6bm9blTtQCAdS6YI@wei-cs.lzblm.mongodb.net/?retryWrites=true&w=majority&appName=WEI-CS')
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
app.use(express.json());

app.use('/api/shotgun', shotgunRoutes);
app.use('/api/event', eventRoutes);
app.use('/api/user', userRoutes);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.get('/', (req, res) => {
  res.json({ message: 'caca'});
});


module.exports = app;