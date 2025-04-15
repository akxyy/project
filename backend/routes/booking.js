import express from 'express';
import { getBooking,submitBooking } from "../controllers/bookingController.js";

const router = express.Router();

router.get('/', getBooking);
router.post("/",submitBooking)


export default router;