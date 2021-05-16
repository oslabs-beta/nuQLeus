// Executes a 'node server.js' script upon use of a nuqleus method
const exec = require('child_process').exec;
exec('node server.js', { encoding: 'utf-8' });
