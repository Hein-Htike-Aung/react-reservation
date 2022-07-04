import express from 'express';
import {
	createRoom,
	deleteRoom,
	getAllRooms,
	getRoom,
	updateRoom,
} from '../controllers/room.controller.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import Room from '../models/Room.js';

const router = express.Router();

// Create
router.post('/:hotelId', isAdmin, createRoom);

// Update
router.patch('/:roomId', isAdmin, updateRoom);

// Delete
router.delete('/:hotelId/:roomId', isAdmin, deleteRoom);

// Delete
router.get('/:roomId', getRoom);

// Get all
router.get('/', getAllRooms);

export default router;
