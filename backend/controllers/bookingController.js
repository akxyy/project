import express from 'express';
import db from '../config/db.js';

const router = express.Router();

const getBooking = (req, res) => {
  const query = 'SELECT * FROM bookings';
  db.query(query, (err, results) => {
    if (err) return res.json({ message: 'Error retrieving bookings' });
    res.json({ data: results });
  });
};

router.get('/', getBooking);

export default router;
