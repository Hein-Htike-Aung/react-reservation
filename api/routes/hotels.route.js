import express from 'express';
import {
	countByCity,
	countByType,
	createHotel,
	deleteHotel,
	getAllHotels,
	getHotel,
	getHotelRooms,
	updateHotel,
} from '../controllers/hotel.controller.js';
import { isAdmin } from '../middlewares/isAdmin.js';

const router = express.Router();

router.post('/', isAdmin, createHotel);

router.patch('/:id', isAdmin, updateHotel);

router.delete('/:id', isAdmin, deleteHotel);

router.get('/find/:id', getHotel);

router.get('/', getAllHotels);

router.get('/countByCity', countByCity);

router.get('/countByType', countByType);

router.get('/room/by-hotel/:hotelId', getHotelRooms);

export default router;
