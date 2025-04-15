import express from 'express';
import tokenVerification from './middleware/auth.js';
import authRoute from './routes/auth.js';
import hotelRoute from './routes/hotels.js';
import destinationsRoute from './routes/destinations.js';
import bookingRoute from './routes/booking.js';
import cors from 'cors';
import 'dotenv/config';
import { filterHotels } from './controllers/hotelsController.js';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use("/auth", authRoute);
app.use("/booking", tokenVerification, bookingRoute);
app.use("/hotels", tokenVerification, hotelRoute);
app.use("/destinations", tokenVerification, destinationsRoute);

app.get('/', (req, res) => {
  res.send("Welcome to Tourism home page");
});

app.get('/filter-hotels', tokenVerification, filterHotels);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;