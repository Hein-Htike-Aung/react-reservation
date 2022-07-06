const AuthReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN_START':
			return {
				user: '',
				loading: true,
				error: '',
			};
		case 'LOGIN_SUCCESS':
			return {
				user: action.payload,
				loading: false,
				error: '',
			};
		case 'LOGIN_FAILURE':
			return {
				user: '',
				loading: false,
				error: action.payload,
			};
		case 'LOGOUT':
			return {
				user: '',
				loading: true,
				error: '',
			};
		default:
			return state;
	}
};

export default AuthReducer;
