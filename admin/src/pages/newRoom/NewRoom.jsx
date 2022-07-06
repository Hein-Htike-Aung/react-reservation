import axios from 'axios';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { roomInputs } from '../../formSource';
import useFetch from '../../hooks/useFetch';
import './newRoom.scss';

const NewRoom = () => {
	const path = useLocation().pathname.split('/')[1];
	const navigate = useNavigate();

	const { data, loading, error } = useFetch(`/hotels`);

	const [info, setInfo] = useState({});
	const [hotelId, setHotelId] = useState();
	const [rooms, setRooms] = useState([]);

	const handleChange = (e) => {
		setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
	};

	const handleSave = async (e) => {
		e.preventDefault();

		const roomNumbers = rooms
			.split(',')
			.map((room) => ({ number: room.trim() }));

		try {
			await axios.post(`/rooms/${hotelId || data[0]._id}`, {
				...info,
				roomNumbers,
			});

			navigate(`/${path}`, { replace: true });
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='new'>
			<Sidebar />
			<div className='newContainer'>
				<Navbar />
				<div className='top'>
					<h1>Add New Room</h1>
				</div>
				<div className='bottom'>
					<div className='right'>
						<form>
							{roomInputs.map((input) => (
								<div key={input.id} className='formInput'>
									<label>{input.label}</label>
									<input
										id={input.id}
										type={input.type}
										placeholder={input.placeholder}
										onChange={handleChange}
									/>
								</div>
							))}

							<div className='formInput'>
								<label>Rooms</label>
								<textarea
									onChange={(e) => setRooms(e.target.value)}
									placeholder='give comma between numbers'
								/>
							</div>

							<div className='formInput'>
								<label>Choose a hotel</label>
								<select
									onChange={(e) => setHotelId(e.target.value)}
									id='hotelId'
								>
									{loading
										? 'loading'
										: data &&
										  data.map((hotel) => (
												<option key={hotel._id} value={hotel._id}>
													{hotel.name}
												</option>
										  ))}
								</select>
							</div>

							<button onClick={handleSave}>Send</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewRoom;
