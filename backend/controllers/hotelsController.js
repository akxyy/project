import express from 'express';
import db from '../config/db.js';

const router = express.Router();

const getHotel = (req, res) => {
  const query = 'SELECT * FROM hotels';
  db.query(query, (err, results) => {
    if (err) return res.json({ message: 'Error retrieving hotels' });
    res.json({ data: results });
  });
};

router.get('/', getHotel);

export default router;
