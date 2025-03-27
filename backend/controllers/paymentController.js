import db from '../config/db.js';

export const createPayment = (req, res) => {
  const { booking_id, payment_date, payment_method, payment_status } = req.body;
  const query = 'INSERT INTO payments (booking_id, payment_date, payment_method, payment_status) VALUES (?, ?, ?, ?)';
  db.query(query, [booking_id, payment_date, payment_method, payment_status], (err) => {
    if (err) return res.json({ message: 'Error creating payment' });
    res.json({ message: 'Payment created successfully' });
  });
};

export const getPayments = (req, res) => {
  const query = 'SELECT * FROM payments';
  db.query(query, (err, results) => {
    if (err) return res.json({ message: 'Error retrieving payments' });
    res.json({ data: results });
  });
};

export const updatePayment = (req, res) => {
  const { id } = req.params;
  const { booking_id, payment_date, payment_method, payment_status } = req.body;
  const query = 'UPDATE payments SET booking_id = ?, payment_date = ?, payment_method = ?, payment_status = ? WHERE id = ?';
  db.query(query, [booking_id, payment_date, payment_method, payment_status, id], (err) => {
    if (err) return res.json({ message: 'Error updating payment' });
    res.json({ message: 'Payment updated successfully' });
  });
};

export const deletePayment = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM payments WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) return res.json({ message: 'Error deleting payment' });
    res.json({ message: 'Payment deleted successfully' });
  });
};
