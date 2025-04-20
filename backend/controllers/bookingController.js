import db from '../config/db.js';

const getBooking = (req, res) => {
  const query = 'SELECT * FROM booking';
  db.query(query, (err, results) => {
    if (err) {
      return res.json({ message: 'Error retrieving bookings' });
    }
    res.json({ data: results });
  });
};

const submitBooking = (req, res) => {
  const { name, phone, checkin, checkout, duration, Price, hotel_name } = req.body;

  const query = `
    INSERT INTO booking (name, phone, checkin, checkout, duration, Price, hotel_name)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [name, phone, checkin, checkout, duration, Price, hotel_name], (err) => {
    if (err) {
      console.error("Booking insert error:", err);
      return res.status(500).json({ message: "Error creating booking", error: err });
    }
    res.json({ message: "Booking submitted successfully" });
  });
};

export { getBooking,submitBooking };