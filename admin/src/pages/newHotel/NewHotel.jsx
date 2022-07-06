import React, { useState } from 'react';
import './newHotel.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { useLocation, useNavigate } from 'react-router-dom';
import { hotelInputs } from '../../formSource';
import useFetch from '../../hooks/useFetch';
import axios from 'axios';

const NewHotel = () => {
	const [files, setFiles] = useState('');
	const [info, setInfo] = useState({});
	const path = useLocation().pathname.split('/')[1];
	const navigate = useNavigate();
	const [rooms, setRooms] = useState([]);

	const { data, loading, error } = useFetch(`/rooms`);

	const handleChange = (e) => {
		setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
	};

	const handleSelect = (e) => {
		const value = Array.from(
			e.target.selectedOptions,
			(option) => option.value,
		);

		setRooms(value);
	};

	const handleSave = async (e) => {
		e.preventDefault();

		try {
			// Create Images
			const list = await Promise.all(
				Object.values(files).map(async (file) => {
					const formData = new FormData();
					formData.append('file', file);
					formData.append('upload_preset', 'upload');

					const uploadRes = await axios.post(
						`https://api.cloudinary.com/v1_1/dxlwpovsu/image/upload`,
						formData,
					);

					const { url } = uploadRes.data;

					return url;
				}),
			);

			// Create Hotel
			const newHotel = {
				...info,
				rooms,
				photos: list,
			};

			await axios.post(`/hotels`, newHotel);

			navigate(`/${path}`, { replace: true });
		} catch (error) {}
	};

	return (
		<div className='new'>
			<Sidebar />
			<div className='newContainer'>
				<Navbar />
				<div className='top'>
					<h1>Add New Hotel</h1>
				</div>
				<div className='bottom'>
					<div className='left'>
						<img
							src={
								files
									? URL.createObjectURL(files[0])
									: 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
							}
							alt=''
						/>
					</div>
					<div className='right'>
						<form>
							<div className='formInput'>
								<label htmlFor='file'>
									Image: <DriveFolderUploadOutlinedIcon className='icon' />
								</label>
								<input
									onChange={(e) => setFiles(e.target.files)}
									hidden
									multiple
									id='file'
									type='file'
								/>
							</div>
							{hotelInputs.map((input) => (
								<div key={input.id} className='formInput'>
									<label>{input.label}</label>
									<input
										id={input.id}
										onChange={handleChange}
										type={input.type}
										placeholder={input.placeholder}
									/>
								</div>
							))}
							<div className='formInput'>
								<label>Featured</label>
								<select onChange={handleChange} id='featured'>
									<option value={false}>No</option>
									<option value={true}>Yes</option>
								</select>
							</div>

							<div className='selectRooms'>
								<label>Rooms</label>
								<select multiple onChange={handleSelect} id='rooms'>
									{loading
										? 'loading'
										: data &&
										  data.map((room) => (
												<option key={room._id} value={room._id}>
													{room.title}
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

export default NewHotel;
