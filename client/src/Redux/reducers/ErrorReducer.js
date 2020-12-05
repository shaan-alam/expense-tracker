import { GET_ERROR, CLEAR_ERROR, LOGIN_FAIL } from "../actions/types";

const initialState = {
	id: "",
	text: "",
};

function ErrorReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ERROR:
		case LOGIN_FAIL:
			return {
				...state,
				...action.payload,
			};

		case CLEAR_ERROR:
			return {
				...state,
				id: "",
				text: "",
			};

		default:
			return state;
	}
}

export default ErrorReducer;
