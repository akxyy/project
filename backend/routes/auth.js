import express from 'express';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';
import tokenVerification from '../middleware/auth.js';

const router = express.Router();

router.post('/login', (req, res) => {
  const { first_name, password } = req.body;

  if (!first_name || !password) {
    return res.json({ message: 'first_name and password are required' });
  }

  db.query('SELECT first_name, password FROM users WHERE first_name = ?', [first_name], (err, results) => {
    if (err) {
      return res.json({ message: 'Database error' });
    }

    if (results.length === 0) {
      return res.json({ message: 'Invalid first_name' });
    }

    const user = results[0];

    if (user.password !== password) {
      return res.json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
      { first_name: user.first_name },
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
      first_name: user.first_name,
    },
  });
});

export default router;