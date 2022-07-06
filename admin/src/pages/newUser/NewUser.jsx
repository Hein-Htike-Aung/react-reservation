import React, { useState } from 'react';
import './newUser.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { userInputs } from '../../formSource';

const NewUser = () => {
	const [file, setFile] = useState('');
	const [info, setInfo] = useState({});
	const path = useLocation().pathname.split('/')[1];
	const navigate = useNavigate();

	const handleChange = (e) => {
		setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
	};

	const handleAdd = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append('file', file);
		formData.append('upload_preset', 'upload');

		try {
			const uploadRes = await axios.post(
				`https://api.cloudinary.com/v1_1/dxlwpovsu/image/upload`,
				formData,
			);

			const { url } = uploadRes.data;

			const newUser = {
				...info,
				img: url,
			};

			await axios.post(`/auth/register`, newUser);

			navigate(`/${path}`, { replace: true });
		} catch (error) {}
	};

	return (
		<div className='new'>
			<Sidebar />
			<div className='newContainer'>
				<Navbar />
				<div className='top'>
					<h1>Add New User</h1>
				</div>
				<div className='bottom'>
					<div className='left'>
						<img
							src={
								file
									? URL.createObjectURL(file)
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
									onChange={(e) => setFile(e.target.files[0])}
									hidden
									id='file'
									type='file'
								/>
							</div>
							{userInputs.map((input) => (
								<div key={input.id} className='formInput'>
									<label>{input.label}</label>
									<input
										onChange={handleChange}
										type={input.type}
										placeholder={input.placeholder}
										id={input.id}
									/>
								</div>
							))}
							<button onClick={handleAdd}>Send</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewUser;
