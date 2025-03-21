import express from 'express';
import { getHotel, createHotel, updateHotel, deleteHotel } from '../controllers/hotelsController.js';

const router = express.Router();

router.get('/', getHotel);
router.post('/', createHotel);
router.put('/:id', updateHotel);
router.delete('/:id', deleteHotel);

export default router;