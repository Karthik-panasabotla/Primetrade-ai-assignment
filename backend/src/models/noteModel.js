const db = require('../config/db');

exports.createNote = ({ user_id, title, content, status }, cb) => {
  db.run(
    'INSERT INTO notes (user_id, title, content, status) VALUES (?, ?, ?, ?)',
    [user_id, title, content, status],
    function (err) { cb(err, { id: this.lastID }); }
  );
};

exports.getNotes = (user_id, search, status, cb) => {
  let query = 'SELECT * FROM notes WHERE user_id = ?';
  let params = [user_id];
  if (search) {
    query += ' AND title LIKE ?';
    params.push(`%${search}%`);
  }
  if (status) {
    query += ' AND status = ?';
    params.push(status);
  }
  db.all(query, params, cb);
};

exports.getNoteById = (id, user_id, cb) => {
  db.get('SELECT * FROM notes WHERE id = ? AND user_id = ?', [id, user_id], cb);
};

exports.updateNote = (id, user_id, { title, content, status }, cb) => {
  db.run(
    'UPDATE notes SET title = ?, content = ?, status = ? WHERE id = ? AND user_id = ?',
    [title, content, status, id, user_id],
    function (err) { cb(err, this.changes); }
  );
};

exports.deleteNote = (id, user_id, cb) => {
  db.run('DELETE FROM notes WHERE id = ? AND user_id = ?', [id, user_id], function (err) {
    cb(err, this.changes);
  });
};
