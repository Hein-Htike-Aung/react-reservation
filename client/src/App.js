import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Hotel from './pages/hotel/Hotel';
import Hotels from './pages/hotels/Hotels';

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/hotels' element={<Hotels />} />
			<Route path='/hotel/:id' element={<Hotel />} />
		</Routes>
	);
};

export default App;
