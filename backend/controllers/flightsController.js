import db from '../config/db.js';

export const createFlight = (req, res) => {
  const { destination_id, airline_name, price, departure_time, arrival_time, duration } = req.body;
  const query = 'INSERT INTO flights (destination_id, airline_name, price, departure_time, arrival_time, duration) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [destination_id, airline_name, price, departure_time, arrival_time, duration], (err) => {
    if (err) return res.json({ message: 'Error creating flight' });
    res.json({ message: 'Flight created successfully' });
  });
};

export const getFlights = (req, res) => {
  const query = 'SELECT * FROM flights';
  db.query(query, (err, results) => {
    if (err) return res.json({ message: 'Error retrieving flights' });
    res.json({ data: results });
  });
};

export const updateFlight = (req, res) => {
  const { id } = req.params;
  const { destination_id, airline_name, price, departure_time, arrival_time, duration } = req.body;
  const query = 'UPDATE flights SET destination_id = ?, airline_name = ?, price = ?, departure_time = ?, arrival_time = ?, duration = ? WHERE id = ?';
  db.query(query, [destination_id, airline_name, price, departure_time, arrival_time, duration, id], (err) => {
    if (err) return res.json({ message: 'Error updating flight' });
    res.json({ message: 'Flight updated successfully' });
  });
};

export const deleteFlight = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM flights WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) return res.json({ message: 'Error deleting flight' });
    res.json({ message: 'Flight deleted successfully' });
  });
};