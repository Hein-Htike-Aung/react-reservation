import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { createError } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

export const register = async (req, res, next) => {
	try {
		const salt = bcrypt.genSaltSync(10);
		const password = bcrypt.hashSync(req.body.password, salt);

		const newUser = new User({
			username: req.body.username,
			email: req.body.email,
			password,
		});

		await newUser.save();

		res.status(201).send('User has been created');
	} catch (error) {
		next(error);
	}
};

export const login = async (req, res, next) => {
	try {
		const user = await User.findOne({ username: req.body.username });

		if (!user) return next(createError(404, 'User not found'));

		const isPasswordCorrect = await bcrypt.compare(
			req.body.password,
			user.password,
		);

		if (!isPasswordCorrect)
			return next(createError(400, 'Wrong password or username'));

		// Crreate Token
		const token = jwt.sign(
			{ id: user._id, isAdmin: user.isAdmin },
			process.env.JWT_SECRET,
		);

		res
			.cookie('access_token', token, { httpOnly: true })
			.status(201)
			.json(_.omit(user.toJSON(), 'password', 'isAdmin'));
	} catch (error) {
		next(error);
	}
};