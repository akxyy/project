import express from 'express';
import { createFlight, getFlights, updateFlight, deleteFlight } from '../controllers/flightsController.js';

const router = express.Router();

router.post('/', createFlight);
router.get('/', getFlights);
router.put('/:id', updateFlight);
router.delete('/:id', deleteFlight);

export default router;