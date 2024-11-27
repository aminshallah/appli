const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./WeildWeeks.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, genre TEXT ,name TEXT NOT NULL, date DATE, location TEXT NOT NULL, startTime INTEGER, endTime INTEGER, duration INTEGER NOT NULL, description TEXT)');
});




module.exports = db;