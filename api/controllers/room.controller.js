import Room from '../models/Room.js';
import Hotel from '../models/Hotel.js';

export const createRoom = async (req, res, next) => {
	const hotelId = req.params.hotelId;
	const newRoom = new Room(req.body);

	try {
		const savedRoom = await newRoom.save();

		// Update Hotel's Room
		await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom.id } });

		res.status(200).json(savedRoom);
	} catch (error) {
		next(error);
	}
};

export const updateRoom = async (req, res, next) => {
	const roomId = req.params.roomId;

	try {
		const updatedRoom = await Room.findByIdAndUpdate(
			roomId,
			{
				$set: req.body,
			},
			{ new: true },
		);

		res.status(200).json(updatedRoom);
	} catch (err) {
		res.status(500).json(err);
	}
};

export const deleteRoom = async (req, res, next) => {
	const roomId = req.params.roomId;
	const hotelId = req.params.hotelId;

	try {
        await Room.findByIdAndDelete(roomId);

        // Update Hotel's Rooms
		await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: roomId } });

		res.status(200).json('Room has been deleted');
	} catch (err) {
		res.status(500).json(err);
	}
};

export const getRoom = async (req, res, next) => {
	const roomId = req.params.roomId;

	try {
		const room = await Room.findById(roomId);

		res.status(200).json(room);
	} catch (err) {
		res.status(500).json(err);
	}
};

export const getAllRooms = async (req, res, next) => {
	try {
		const rooms = await Room.find();
		res.status(200).json(rooms);
	} catch (err) {
		res.status(500).json(err);
	}
};
