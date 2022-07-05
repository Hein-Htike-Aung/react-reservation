import { createContext, useReducer } from 'react';
import SearchReducer from './SearchReducer';

export const INITIAL_STATE = {
	city: '',
	dates: [],
	options: {
		adult: '',
		children: '',
		rooms: '',
	},
};

export const SearchContext = createContext(INITIAL_STATE);

export const SearchContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

	return (
		<SearchContext.Provider
			value={{
				city: state.city,
				dates: state.dates,
				options: state.options,
				dispatch,
			}}
		>
			{children}
		</SearchContext.Provider>
	);
};
