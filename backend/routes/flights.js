import express from 'express';
import db from '../config/db.js';

const router = express.Router();

router.post('/', (req, res) => {
  const { destination_id, airline_name, price, departure_time, arrival_time, duration } = req.body;
  const query = 'INSERT INTO flights (destination_id, airline_name, price, departure_time, arrival_time, duration) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [destination_id, airline_name, price, departure_time, arrival_time, duration], (err) => {
    if (err) return res.json({ message: 'Error creating flight' });
    res.json({ message: 'Flight created successfully' });
  });
});

router.get('/', (req, res) => {
  const query = 'SELECT * FROM flights';
  db.query(query, (err, results) => {
    if (err) return res.json({ message: 'Error retrieving flights' });
    res.json({ data: results });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { destination_id, airline_name, price, departure_time, arrival_time, duration } = req.body;
  const query = 'UPDATE flights SET destination_id = ?, airline_name = ?, price = ?, departure_time = ?, arrival_time = ?, duration = ? WHERE id = ?';
  db.query(query, [destination_id, airline_name, price, departure_time, arrival_time, duration, id], (err) => {
    if (err) return res.json({ message: 'Error updating flight' });
    res.json({ message: 'Flight updated successfully' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM flights WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) return res.json({ message: 'Error deleting flight' });
    res.json({ message: 'Flight deleted successfully' });
  });
});

export default router;
