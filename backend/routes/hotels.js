import express from 'express';
import db from '../config/db.js';
import getHotel from '../controllers/hotelsController.js';

const router = express.Router();

router.get('/', getHotel);

router.post('/', (req, res) => {
  const { id, name, price_per_night, destination_id, amenities } = req.body;
  const query = 'INSERT INTO hotels (id, name, price_per_night, destination_id, amenities) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [id, name, price_per_night, destination_id, amenities], (err) => {
      if (err) return res.json({ message: 'Error creating hotel' });
      res.json({ message: 'Hotel created successfully' });
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM hotels WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) return res.json({ message: 'Error retrieving hotel' });
    if (results.length === 0) return res.json({ message: 'Hotel not found' });
    res.json({ data: results[0] });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, price_per_night, destination_id, amenities } = req.body;
  const query = 'UPDATE hotels SET name = ?, price_per_night = ?, destination_id = ?, amenities = ? WHERE id = ?';
  db.query(query, [name, price_per_night, destination_id, amenities, id], (err) => {
    if (err) return res.json({ message: 'Error updating hotel' });
    res.json({ message: 'Hotel updated successfully' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM hotels WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) return res.json({ message: 'Error deleting hotel' });
    res.json({ message: 'Hotel deleted successfully' });
  });
});

export default router;
