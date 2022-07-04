import express from 'express';
import {
	deleteUser,
	getAllUsers,
	getUser,
	updateUser,
} from '../controllers/user.controller.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { verifyCurrentUser } from '../middlewares/verifyCurrentUser.js';

const router = express.Router();

router.patch('/:id', verifyCurrentUser,updateUser);

router.delete('/:id', verifyCurrentUser, deleteUser);

router.get('/:id', verifyCurrentUser,getUser);

router.get('/', isAdmin, getAllUsers);
export default router;
