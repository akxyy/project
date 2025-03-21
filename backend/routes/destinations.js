import express from 'express';
import { createDestination, getDestinations, updateDestination, deleteDestination } from '../controllers/destinationsController.js';

const router = express.Router();

router.post('/', createDestination);
router.get('/', getDestinations);
router.put('/:id', updateDestination);
router.delete('/:id', deleteDestination);

export default router;