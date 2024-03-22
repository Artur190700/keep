const express = require('express');
const Note = require('./models/Note');
const auth = require('./middleware/auth');
const router = express.Router();

// Middleware to authenticate user
router.use(auth);

// POST a new note
router.post('/notes', async (req, res) => {
  try {
    const note = new Note({ title: req.body.title, content: req.body.content, owner: req.user._id });
    await note.save();
    res.status(201).send(note);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET all notes of the logged-in user
router.get('/notes', async (req, res) => {
  try {
    await req.user.populate('notes');
    res.send(req.user.notes);
  } catch (error) {
    res.status(500).send(error);
  }
});

// PUT to update a specific note
router.put('/notes/:id', async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, owner: req.user._id });
    if (!note) {
      return res.status(404).send('Note not found');
    }
    note.title = req.body.title;
    note.content = req.body.content;
    await note.save();
    res.send(note);
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE a specific note
router.delete('/notes/:id', async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
    if (!note) {
      return res.status(404).send('Note not found');
    }
    res.send({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Remaining CRUD operations (GET, PUT, DELETE) similarly, ensuring user ownership

module.exports = router;
