import User from '../models/User.js';
import _ from 'lodash';

export const updateUser = async (req, res, next) => {
	const id = req.params.id;

	try {
		const updatedUser = await User.findByIdAndUpdate(
			id,
			{
				$set: req.body,
			},
			{ new: true },
		);

		res.status(200).json(_.omit(updatedUser.toJSON(), 'password', 'isAdmin'));
	} catch (err) {
		next(err);
	}
};
export const deleteUser = async (req, res, next) => {
	const id = req.params.id;

	try {
		await User.findByIdAndDelete(id);

		res.status(200).send('User has been deleted');
	} catch (err) {
		next(err);
	}
};
export const getUser = async (req, res, next) => {
	const id = req.params.id;

	try {
		const user = await User.findById(id);

		res.status(200).json(_.omit(user.toJSON(), 'password', 'isAdmin'));
	} catch (err) {
		next(err);
	}
};
export const getAllUsers = async (req, res, next) => {
	try {
		const users = await User.find();
		res.status(200).json(
			_.map(users, function (user) {
				return _.omit(user.toJSON(), 'password', 'isAdmin');
			}),
		);
	} catch (err) {
		next(err);
	}
};
