const express = require('express'); // Import Express.js library
const path = require('path'); // Import path module for handling file paths

// Import the API router from the routes folder
const api = require('./routes/index');

const PORT = process.env.PORT || 3001; // Set port to the environment variable PORT or default to 3001

const app = express(); // Create an instance of an Express application

// Middleware to parse incoming JSON data
app.use(express.json());

// Middleware to parse incoming URL-encoded data (e.g., form submissions)
app.use(express.urlencoded({ extended: true }));

// Middleware to serve static files from the 'public' directory
app.use(express.static('public'));

// Middleware to route API requests starting with /api to the 'api' router
// The 'api' router handles API endpoints for the application
app.use('/api', api);

// View route to serve the notes.html file when accessing /notes
// This route is used to display the notes page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

// View route to serve the index.html file for all other routes
// This wildcard route is used to display the homepage or handle undefined routes
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

// Start the server and listen on the specified port (PORT)
// Log a message indicating the server is running and provide the URL to access it locally
app.listen(PORT, () => console.log(`Note-Taker listening at http://localhost:${PORT} 🚀`));