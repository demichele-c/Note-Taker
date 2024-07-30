const express = require('express');
const path = require('path');

// Import the feedback router
const api = require('./routes/index');

const PORT = 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to serve up static assets from the public folder
app.use(express.static('public'));

// Middleware to send requests that begin with /api to the index.js in the routes folder
// this is declared in the api variable above
app.use('/api', api);

// This view route is a GET route for the notes page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

// This view route is a GET route for the homepage
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

// Start the server and listen on the specified port (PORT).
// When the server is successfully started, log a message indicating
// that the Note-Taker application is running and provide the URL
// where it can be accessed locally.
//
app.listen(PORT, () => console.log(`Note-Taker listening at http://localhost:${PORT} 🚀`));