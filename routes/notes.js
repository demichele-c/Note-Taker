// Import the Router class from the 'express' module
const notes = require('express').Router();
// Import the 'fs' module for file system operations
const fs = require('fs');
// Import the 'path' module for working with file and directory paths
const path = require('path');
// Import the 'uuid' function from the 'uuidv4' module to generate unique IDs
const { uuid } = require('uuidv4');

// Helper function to read data from a JSON file
const readFromFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err); // Reject the promise if an error occurs
      } else {
        resolve(data); // Resolve the promise with the file data
      }
    });
  });
};

// Helper function to write data to a JSON file
const writeToFile = (destination, content) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) => {
      if (err) {
        reject(err); // Reject the promise if an error occurs
      } else {
        resolve(`Data written to ${destination}`); // Resolve the promise with a success message
      }
    });
  });
};

// Function to read the db.json file and return the notes
const readAndReturnNotes = async () => {
  const data = await readFromFile(path.join(__dirname, '../db/db.json'));
  return JSON.parse(data);
};

// GET route for retrieving notes
notes.get('/', async (req, res) => {
  console.log(`GET request received to retrieve notes`);
  try {
    const notes = await readAndReturnNotes(); // Retrieve notes from the JSON file
    res.status(200).json(notes); // Send the notes as a JSON response with status 200 (OK)
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve notes.' }); // Send an error response with status 500 (Internal Server Error)
  }
});

// POST route for adding a new note
notes.post('/', async (req, res) => {
  console.log(`Add ${JSON.stringify(req.body)} to note(s)`);

  try {
    const currentNotes = await readAndReturnNotes(); // Retrieve current notes from the JSON file
    const newNote = {
      id: uuid(), // Generate a unique ID for the new note
      title: req.body.title,
      text: req.body.text
    };

    currentNotes.push(newNote); // Add the new note to the current notes
    await writeToFile(path.join(__dirname, '../db/db.json'), currentNotes); // Write the updated notes to the JSON file

    res.status(200).json(newNote); // Send the new note as a JSON response with status 200 (OK)
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add the note.' }); // Send an error response with status 500 (Internal Server Error)
  }
});

// DELETE route for deleting a note by its ID
notes.delete('/:id', async (req, res) => {
  console.log(`${req.method} request received to delete a note ID: ${req.params.id}`);
  const noteId = req.params.id;

  try {
    const currentNotes = await readAndReturnNotes(); // Retrieve current notes from the JSON file
    const filteredNotes = currentNotes.filter(note => note.id !== noteId); // Filter out the note with the specified ID

    if (currentNotes.length === filteredNotes.length) {
      return res.status(404).json({ message: `Note with ID: ${noteId} not found.` }); // Send a 404 (Not Found) response if the note ID does not exist
    }

    await writeToFile(path.join(__dirname, '../db/db.json'), filteredNotes); // Write the updated notes to the JSON file
    res.status(200).json({ message: `Note with ID: ${noteId} has been deleted.` }); // Send a success message with status 200 (OK)
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete the note.' }); // Send an error response with status 500 (Internal Server Error)
  }
});

// Export the router to be used in other parts of the application
module.exports = notes;