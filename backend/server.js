const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/',(re, res)=>{
  return res.json("From BackendSide")
})

// Endpoint pour obtenir tous les éléments
app.get('/api/events', (req, res) => {
    db.all('SELECT * FROM events', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ events: rows });
    });
});

// Endpoint pour ajouter un nouvel élément
app.post('/api/events', (req, res) => {
    const {genre,name,date,location, startTime , endTime , duration, description } = req.body;

    console.log('Données reçues:', req.body);

    if (!genre || !name || !date || !location || !startTime || !endTime || !duration) {
      return res.status(400).json({ error: 'Tous les champs sont requis.' });
  }


    db.run('INSERT INTO events (genre,name, date, location, startTime , endTime , duration, description) VALUES (?, ?, ?,?,?,?,?,?)', [genre,name, date, location, startTime , endTime , duration, description], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ id: this.lastID, name, description });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});