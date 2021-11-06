// Dependencies
// =============================================================
const express = require('express');
const fs = require('fs');
// const apiRoutes = require('./routes/apiRoutes');
// const htmlRoutes = require('./routes/htmlRoutes');
const path = require('path');
const { dbnotes } = require('./db/db.json');

console.log(dbnotes);

const app = express();
const PORT = process.env.PORT || 3001;

function filterAllButId(id, notesArray) {
    const result = notesArray.filter(note => note.id !== id);
    updateNotesArray(result);
    return result;
}

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify({ notesArray }, null, 2));
    return note;
}

function updateNotesArray(newArray) {
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify({ newArray }, null, 2));
    return newArray;
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

app.get('/api/notes', (req, res) => {
    res.json(dbnotes);
});

app.post('api/notes', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = animals.length.toString();

    const note = createNewNote(req.body, dbnotes);
    res.json(note);
});

app.delete('api/note/:id', (req,res) => {
    const newArray = filterAllButId(req.body.id, dbnotes);
    res.json(newArray);
});

// Listener
// =============================================================
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});