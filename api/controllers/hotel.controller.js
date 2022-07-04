import Hotel from '../models/Hotel.js';
import _ from 'lodash';

export const createHotel = async (req, res, next) => {
	const newHotel = new Hotel(req.body);

	try {
		const savedHotel = await newHotel.save();

		res.status(200).json(savedHotel);
	} catch (err) {
		next(err);
	}
};

export const updateHotel = async (req, res, next) => {
	const id = req.params.id;

	try {
		const updatedHotel = await Hotel.findByIdAndUpdate(
			id,
			{
				$set: req.body,
			},
			{ new: true },
		);

		res.status(200).json(updatedHotel);
	} catch (err) {
		next(err);
	}
};

export const deleteHotel = async (req, res, next) => {
	const id = req.params.id;

	try {
		await Hotel.findByIdAndDelete(id);

		res.status(200).send('Hotel has been deleted');
	} catch (err) {
		next(err);
	}
};

export const getHotel = async (req, res, next) => {
	const id = req.params.id;

	try {
		const hotel = await Hotel.findById(id);

		res.status(200).json(hotel);
	} catch (err) {
		next(err);
	}
};

export const getAllHotels = async (req, res, next) => {
	try {
		const hotels = await Hotel.find();
		res.status(200).json(hotels);
	} catch (err) {
		next(err);
	}
};

export const countByCity = async (req, res, next) => {
	const cities = _.get(req, 'query.cities').split(',');

	console.log(cities)

	try {
		const list = await Promise.all(
			cities.map((city) => {
				// return Hotel.find({ city }).length;

				return Hotel.countDocuments({ city });
			}),
		);

		res.status(200).json(list);
	} catch (err) {
		next(err);
	}
};

export const countByType = async (req, res, next) => {
	try {
		const hotels = await Hotel.find();
		res.status(200).json(hotels);
	} catch (err) {
		next(err);
	}
};
