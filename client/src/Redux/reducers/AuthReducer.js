import {
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGOUT,
} from "../actions/types";

const initialState = {
	token: localStorage.getItem("token"),
	isAuthenticated: false,
	user: null,
	isAuthenticating: false,
};

function AuthReducer(state = initialState, action) {
	switch (action.type) {
		case LOGOUT:
			return {
				...state,
				token: null,
				isAuthenticated: false,
				user: null,
			};

		case LOGIN_FAIL:
		case REGISTER_FAIL:
			return {
				...state,
				token: null,
				isAuthenticated: false,
				user: null,
			};

		case LOGIN_SUCCESS:
		case REGISTER_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
				token: action.payload.token,
				user: action.payload.user,
			};

		default:
			return state;
	}
}

export default AuthReducer;
