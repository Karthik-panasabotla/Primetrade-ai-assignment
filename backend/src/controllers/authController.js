const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/userModel');

exports.signup = (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'All fields required' });
  User.findByEmail(email, (err, user) => {
    if (user) return res.status(409).json({ message: 'Email already exists' });
    bcrypt.hash(password, 10, (err, hash) => {
      User.createUser({ name, email, password: hash }, (err, result) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        const token = jwt.sign({ id: result.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(201).json({ token });
      });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findByEmail(email, (err, user) => {
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    bcrypt.compare(password, user.password, (err, valid) => {
      if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      res.json({ token });
    });
  });
};

exports.getProfile = (req, res) => {
  User.findById(req.user.id, (err, user) => {
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ id: user.id, name: user.name, email: user.email });
  });
};

exports.updateProfile = (req, res) => {
  const { name, email } = req.body;
  User.updateProfile(req.user.id, { name, email }, (err, changed) => {
    if (err || !changed) return res.status(400).json({ message: 'Profile update failed' });
    res.json({ message: 'Profile updated' });
  });
};
