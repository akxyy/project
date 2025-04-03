import express from 'express';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';
import tokenVerification from '../middleware/auth.js';

const router = express.Router();

router.post('/getUserId', (req, res) => {
  const { first_name } = req.body;

  if (!first_name) {
    return res.status(400).json({ message: 'first_name is required' });
  }

  db.query('SELECT id FROM users WHERE first_name = ?', [first_name], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = results[0];
    res.json({ id: user.id });
  });
});

router.post('/login', (req, res) => {
  const { first_name, id, password } = req.body;

  if (!first_name || !id || !password) {
    return res.status(400).json({ message: 'first_name, id, and password are required' });
  }

  db.query('SELECT id, first_name, password FROM users WHERE id = ? AND first_name = ?', [id, first_name], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid id or first_name' });
    }

    const user = results[0];

    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
      { id: user.id, first_name: user.first_name },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '24h' }
    );

    res.json({ token });
  });
});

router.post('/validate-token', tokenVerification, (req, res) => {
  const user = req.user;

  res.json({
    message: 'Token is valid',
    user: {
      id: user.id,
      first_name: user.first_name,
    },
  });
});

export default router;