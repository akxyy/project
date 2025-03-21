import db from '../config/db.js';

export const getHotel = (req, res) => {
  const query = 'SELECT * FROM hotels';
  db.query(query, (err, results) => {
    if (err) return res.json({ message: 'Error retrieving hotels' });
    res.json({ data: results });
  });
};

export const createHotel = (req, res) => {
  const { id, name, price_per_night, destination_id, amenities } = req.body;
  const query = 'INSERT INTO hotels (id, name, price_per_night, destination_id, amenities) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [id, name, price_per_night, destination_id, amenities], (err) => {
    if (err) return res.json({ message: 'Error creating hotel' });
    res.json({ message: 'Hotel created successfully' });
  });
};

export const updateHotel = (req, res) => {
  const { id } = req.params;
  const { name, price_per_night, destination_id, amenities } = req.body;
  const query = 'UPDATE hotels SET name = ?, price_per_night = ?, destination_id = ?, amenities = ? WHERE id = ?';
  db.query(query, [name, price_per_night, destination_id, amenities, id], (err) => {
    if (err) return res.json({ message: 'Error updating hotel' });
    res.json({ message: 'Hotel updated successfully' });
  });
};

export const deleteHotel = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM hotels WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) return res.json({ message: 'Error deleting hotel' });
    res.json({ message: 'Hotel deleted successfully' });
  });
};
