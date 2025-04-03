import express from 'express';
import tokenVerification from './middleware/auth.js';
import authRoute from './routes/auth.js';
import hotelRoute from './routes/hotels.js';
import destinationsRoute from './routes/destinations.js';
import flightsRoute from './routes/flights.js';
import bookingRoute from './routes/booking.js';
import paymentRoute from './routes/payments.js';
import cors from 'cors';
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use("/auth", authRoute);
app.use("/booking", tokenVerification, bookingRoute);
app.use("/payments", tokenVerification, paymentRoute);
app.use("/hotels", tokenVerification, hotelRoute);
app.use("/destinations", tokenVerification, destinationsRoute);
app.use("/flights", tokenVerification, flightsRoute);

app.get('/', (req, res) => {
  res.send("Welcome to Tourism home page");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;