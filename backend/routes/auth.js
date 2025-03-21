import express from 'express';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';
import tokenVerification from '../middleware/auth.js';

const router = express.Router();

router.post('/login', (req, res) => {
  const { first_name, password } = req.body;

  db.query(
    'SELECT * FROM users WHERE first_name = ? AND password = ?',
    [first_name, password],
    (err, results) => {
      if (err) {
        return res.json({ message: 'Database error' });
      }
      const user = results[0];

      const token = jwt.sign(
        { username: user.first_name, password: user.password },
         'akshay123',
        { expiresIn: '24h' }
      );

      res.json({ token });
    }
  );
});

router.post('/validate-token', tokenVerification, (req, res) => {
  const user = req.user;

  res.json({
    message: 'Token is valid',
    user: {
      username: user.first_name,
      password: user.password,
    },
  });
});

export default router;