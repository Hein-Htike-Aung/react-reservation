import { createError } from '../utils/error.js';
import { verifyToken } from './verifyToken.js';

export const verifyCurrentUser = (req, res, next) => {
	verifyToken(req, res, next, () => {
		const currentUserId = req.paramas.id;
		if (req.user.id === currentUserId || req.user.isAdmin) next();
		else return next(createError(403, 'You are not authorized'));
	});
};
