import express from 'express';
import tokenVerification from './middleware/auth.js';

const app = express();
const port = 3000;

import authRoute from './routes/auth.js';
import hotelRoute from './routes/hotels.js';
import destinationsRoute from './routes/destinations.js';
import flightsRoute from './routes/flights.js';
import bookingRoute from './routes/booking.js';
import paymentRoute from './routes/payments.js';

app.use(express.json());
app.use("/auth", authRoute);
app.use("/booking", tokenVerification, bookingRoute);
app.use("/payments", tokenVerification, paymentRoute);
app.use("/hotels",tokenVerification, hotelRoute);
app.use("/destinations",tokenVerification, destinationsRoute);
app.use("/flights",tokenVerification, flightsRoute);

app.get('/', (req, res) => {
  const fetchData = new Promise((resolve, reject) => {
    fetch('https://dummyjson.com/products')
      .then(response => {
        if (!response.ok) {
          reject(new Error(`error`));
        } else {
          resolve(response.json());
        }
      })
      .catch(err => reject(err));
  });

  fetchData
    .then(data => res.send(data))
    .catch(err => {
      console.error(err);
      res.send({ message: 'Error fetching data' });
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});