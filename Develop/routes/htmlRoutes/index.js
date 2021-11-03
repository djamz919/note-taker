const path = require('path');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});