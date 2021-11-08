// Dependencies
// =============================================================
const { rejects } = require('assert');
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
let { notesArray } = require('./db/db.json');

console.log(notesArray);

const app = express();
const PORT = process.env.PORT || 3001;

function filterAllButId(id, notesArray) {
    console.log(id);
    const result = notesArray.filter(note => note.id !== id);
    return result;
}

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify({ notesArray }, null, 2));
    return notesArray;
}

function updateNotesArray(notesArray) {
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify({ notesArray }, null, 2));
    return notesArray;
}

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public')); // Give express access to the public folder

// Routes
// app.use('/api', apiRoutes);
// app.use('/', htmlRoutes);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
  });

app.get('/api/notes', (req, res) => {
    res.json(notesArray);
});

app.post('/api/notes', (req, res) => {
    // set id based on what the next index of the array will be - to be changed if I want to implement delete
    req.body.id = uuidv4();
    console.log(req.body.id);

    const note = createNewNote(req.body, notesArray);
    res.json(note);
});

app.delete('/api/notes/:id', (req,res) => {
    const savedArray = updateNotesArray(filterAllButId(req.params.id, notesArray));
    notesArray = savedArray;
    res.json(savedArray);
});

// Listener
// =============================================================
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});