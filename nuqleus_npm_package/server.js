/*
Creates an Express server that serves static files for the nuQLeus GUI to: localhost:3030/nuqleus
when the nuqleus wrapper methods are invoked on an end user's server.
*/

const path = require('path');
const express = require('express');
const app = express();
const PORT = 3030;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('.'));

app.get('/nuqleus', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, './index.html'));
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
