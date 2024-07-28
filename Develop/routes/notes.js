
const notes = require('express').Router();
const fs = require('fs');
const path = require('path');
const { uuid } = require('uuidv4');

// Helper functions for reading and writing to the JSON file
const readFromFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const writeToFile = (destination, content) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(`Data written to ${destination}`);
      }
    });
  });
};

// function to read the db.json file and return the notes
const readAndReturnNotes = async () => {
  const data = await readFromFile(path.join(__dirname, '../db/db.json'));
  return JSON.parse(data);
};

// GET route for retrieving notes
notes.get('/', async (req, res) => {
  console.log(`GET request received to retrieve notes`);
  try {
    const notes = await readAndReturnNotes();
    res.status(200).json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve notes.' });
  }
});

// POST route for adding a new note
notes.post('/', async (req, res) => {
  console.log(`Add ${JSON.stringify(req.body)} to note(s)`);

  try {
    const currentNotes = await readAndReturnNotes();
    const newNote = {
      id: uuid(),
      title: req.body.title,
      text: req.body.text
    };

    currentNotes.push(newNote);
    await writeToFile(path.join(__dirname, '../db/db.json'), currentNotes);

    res.status(200).json(newNote);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add the note.' });
  }
});

// DELETE route for deleting a note by its ID
notes.delete('/:id', async (req, res) => {
  console.log(`${req.method} request received to delete a note ID: ${req.params.id}`);
  const noteId = req.params.id;

  try {
    const currentNotes = await readAndReturnNotes();
    const filteredNotes = currentNotes.filter(note => note.id !== noteId);

    if (currentNotes.length === filteredNotes.length) {
      return res.status(404).json({ message: `Note with ID: ${noteId} not found.` });
    }

    await writeToFile(path.join(__dirname, '../db/db.json'), filteredNotes);
    res.status(200).json({ message: `Note with ID: ${noteId} has been deleted.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete the note.' });
  }
});

module.exports = notes;