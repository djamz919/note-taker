// Dependencies
// =============================================================
const express = require('express');
// const apiRoutes = require('./routes/apiRoutes');
// const htmlRoutes = require('./routes/htmlRoutes');
const path = require('path');


const app = express();
const PORT = 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// app.use('/api', apiRoutes);
// app.use('/', htmlRoutes);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html/'));
});

// Listener
// =============================================================
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });