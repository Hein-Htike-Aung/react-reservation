import { createError } from '../utils/error.js';
import { verifyToken } from './verifyToken.js';

export const isAdmin = (req, res, next) => {
	verifyToken(req, res, next, () => {
		if (!req.user.isAdmin) return next(createError(403, 'Forbidden action'));
		else next();
	});
};
