const express = require('express');
const fs = require('fs');
const path =require('path');
const uuid = require('./helper/uuid')

const PORT = process.env.PORT || 3001;

const app = express();

// MiddleWare
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Get request to get to notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

// Post request that sends new note to db
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    let db = JSON.parse(fs.readFileSync('./db/db.json','utf8'))
    console.log(db)
    db.push(newNote)
    fs.writeFileSync('./db/db.json', JSON.stringify(db), 'utf8')
    res.json(db)
});

// Get request to retrieve notes from db to display them
app.get('/api/notes', (req, res) => {
    let db = JSON.parse(fs.readFileSync('db/db.json','utf8'))
    res.json(db)
});

//Server listener
app.listen(PORT, () => {
    console.log(`The server is live on PORT ${PORT}`)
});