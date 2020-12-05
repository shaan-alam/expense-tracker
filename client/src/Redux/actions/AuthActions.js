import {
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGOUT,
} from "./types";
import { getError } from "./ErrorActions";
import axios from "axios";

export const tokenConfig = (getState) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	// check for token
	const token = getState().auth.token;
	if (token) {
		config.headers["x-auth-token"] = token;
	}

	return config;
};

// register function
export const register = ({ name, email, password }, redirect) => (
	dispatch,
	getState
) => {
	axios
		.post("/auth/register", { name, email, password }, tokenConfig(getState))
		.then((res) => {
			dispatch({ type: REGISTER_SUCCESS, payload: res.data });

			// redirect user to the homepage
			redirect();
		})
		.catch((err) => {
			dispatch(
				getError({ id: REGISTER_FAIL, text: err.response.data.message })
			);
		});
};

// login function
export const login = ({ email, password }, redirect) => (
	dispatch,
	getState
) => {
	axios
		.post("/auth/login", { email, password }, tokenConfig(getState))
		.then((res) => {
			dispatch({ type: LOGIN_SUCCESS, payload: res.data });

			// redirect user to the homepage
			redirect();
		})
		.catch((err) => {
			dispatch(getError({ id: LOGIN_FAIL, text: err.response.data.message }));
		});
};

// logout actions
export const logout = () => {
	return {
		type: LOGOUT,
	};
};
