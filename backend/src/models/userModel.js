const db = require('../config/db');

exports.createUser = ({ name, email, password }, cb) => {
  db.run(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, password],
    function (err) { cb(err, { id: this.lastID }); }
  );
};

exports.findByEmail = (email, cb) => {
  db.get('SELECT * FROM users WHERE email = ?', [email], cb);
};

exports.findById = (id, cb) => {
  db.get('SELECT * FROM users WHERE id = ?', [id], cb);
};

exports.updateProfile = (id, { name, email }, cb) => {
  db.run(
    'UPDATE users SET name = ?, email = ? WHERE id = ?',
    [name, email, id],
    function (err) { cb(err, this.changes); }
  );
};
