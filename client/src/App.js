import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Hotel from './pages/hotel/Hotel';
import Hotels from './pages/hotels/Hotels';
import Login from './pages/login/Login';

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/hotels' element={<Hotels />} />
			<Route path='/hotel/:id' element={<Hotel />} />
			<Route path='/login' element={<Login />} />
		</Routes>
	);
};

export default App;
