import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import List from './pages/list/List';
import Single from './pages/single/Single';
import New from './pages/new/New';
import { productInputs, userInputs } from './formSource';
import './style/dark.scss';
import { DarkModeContext } from './context/darkModeReducer';

const App = () => {

	const {darkMode} = useContext(DarkModeContext);

	return (
		<div className={darkMode ? 'app dark' : 'app'}>
			<Routes>
				<Route path='/'>
					<Route index element={<Home />} />
					<Route path='login' element={<Login />} />
					<Route path='users'>
						<Route index element={<List />} />
						<Route path=':userId' element={<Single />} />
						<Route
							path='new'
							element={<New title='Add New User' inputs={userInputs} />}
						/>
					</Route>
					<Route path='products'>
						<Route index element={<List />} />
						<Route path=':productId' element={<Single />} />
						<Route
							path='newProduct'
							element={<New inputs={productInputs} title='Add New Product' />}
						/>
					</Route>
				</Route>
			</Routes>
		</div>
	);
};

export default App;
