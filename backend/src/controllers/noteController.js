const Note = require('../models/noteModel');

exports.createNote = (req, res) => {
  const { title, content, status } = req.body;
  Note.createNote({ user_id: req.user.id, title, content, status }, (err, note) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.status(201).json(note);
  });
};

exports.getNotes = (req, res) => {
  const { search, status } = req.query;
  Note.getNotes(req.user.id, search, status, (err, notes) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.json(notes);
  });
};

exports.getNoteById = (req, res) => {
  Note.getNoteById(req.params.id, req.user.id, (err, note) => {
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  });
};

exports.updateNote = (req, res) => {
  Note.updateNote(req.params.id, req.user.id, req.body, (err, changed) => {
    if (!changed) return res.status(404).json({ message: 'Note not found' });
    res.json({ message: 'Note updated' });
  });
};

exports.deleteNote = (req, res) => {
  Note.deleteNote(req.params.id, req.user.id, (err, changed) => {
    if (!changed) return res.status(404).json({ message: 'Note not found' });
    res.json({ message: 'Note deleted' });
  });
};
