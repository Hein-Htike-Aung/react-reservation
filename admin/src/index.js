import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { DarkModeContextProvider } from './context/darkModeReducer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<AuthContextProvider>
		<DarkModeContextProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</DarkModeContextProvider>
	</AuthContextProvider>,
);
