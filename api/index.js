/* add "type": "module" in package.json */
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
// .js must add, cuz its custom file
import cookieParser from 'cookie-parser';
import authRoute from './routes/auth.route.js';
import hotelsRoute from './routes/hotels.route.js';
import roomsRoute from './routes/rooms.route.js';
import usersRoute from './routes/users.route.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cors from 'cors';

const app = express();
dotenv.config();

/* MongoDB Connection */
const connect = async () => {
	try {
		await mongoose.connect(process.env.MONGO);
		console.log('Connected to mongoDB.');
	} catch (error) {
		throw error;
	}
};

mongoose.connection.on('disconnected', () => {
	console.log('mongoDB disconnected!');
});

/* Middlewares */
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);

app.use(errorHandler);

app.listen(8800, () => {
	connect();
	console.log('Connected to backend');
});
