import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import List from './pages/list/List';
import Single from './pages/single/Single';
import {
	hotelInputs,
	productInputs,
	roomInputs,
	userInputs,
} from './formSource';
import './style/dark.scss';
import { DarkModeContext } from './context/darkModeReducer';
import { AuthContext } from './context/AuthContext';
import { hotelColumns, roomColumns, userColumns } from './datasource';
import NewUser from './pages/newUser/NewUser';
import NewHotel from './pages/newHotel/NewHotel';
import NewRoom from './pages/newRoom/NewRoom';

const App = () => {
	const { darkMode } = useContext(DarkModeContext);

	const ProtectedRoute = ({ children }) => {
		const { user } = useContext(AuthContext);

		if (!user) {
			return <Navigate to='/login' />;
		}

		return children;
	};

	return (
		<div className={darkMode ? 'app dark' : 'app'}>
			<Routes>
				<Route path='/'>
					<Route
						index
						element={
							<ProtectedRoute>
								<Home />
							</ProtectedRoute>
						}
					/>
					<Route path='login' element={<Login />} />
					<Route path='users'>
						<Route
							index
							element={
								<ProtectedRoute>
									<List columns={userColumns} />
								</ProtectedRoute>
							}
						/>
						<Route
							path=':userId'
							element={
								<ProtectedRoute>
									<Single />
								</ProtectedRoute>
							}
						/>
						<Route
							path='new'
							element={
								<ProtectedRoute>
									<NewUser />
								</ProtectedRoute>
							}
						/>
					</Route>
					<Route path='hotels'>
						<Route
							index
							element={
								<ProtectedRoute>
									<List columns={hotelColumns} />
								</ProtectedRoute>
							}
						/>
						<Route
							path=':hotelId'
							element={
								<ProtectedRoute>
									<Single />
								</ProtectedRoute>
							}
						/>
						<Route
							path='new'
							element={
								<ProtectedRoute>
									<NewHotel />
								</ProtectedRoute>
							}
						/>
					</Route>
					<Route path='rooms'>
						<Route
							index
							element={
								<ProtectedRoute>
									<List columns={roomColumns} />
								</ProtectedRoute>
							}
						/>
						<Route
							path=':roomId'
							element={
								<ProtectedRoute>
									<Single />
								</ProtectedRoute>
							}
						/>
						<Route
							path='new'
							element={
								<ProtectedRoute>
									<NewRoom />
								</ProtectedRoute>
							}
						/>
					</Route>
				</Route>
			</Routes>
		</div>
	);
};

export default App;
