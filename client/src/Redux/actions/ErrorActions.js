import { GET_ERROR, CLEAR_ERROR } from "./types";

export const getError = (payload) => {
	return {
		type: GET_ERROR,
		payload,
	};
};

export const clearError = () => {
	return {
		type: CLEAR_ERROR,
	};
};
