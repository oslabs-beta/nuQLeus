const path = require('path');
const express = require('express');
const open = require('open');
const app = express();
const PORT = 3030;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/nuqleus', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, './index.html'));
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  open(`http://localhost:${PORT}/nuqleus`);
});

