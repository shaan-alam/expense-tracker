import {
	GET_TRANSACTIONS,
	ADD_TRANSACTION,
	REMOVE_TRANSACTION,
  IS_TRANSACTION_LOADING
} from "../actions/types";

const initialState = {
	transactions: [],
	isLoading: false,
};

export default function transactions(state = initialState, action) {
	switch (action.type) {
		case GET_TRANSACTIONS:
			return {
				...state,
				transactions: [...action.payload],
			};

		case ADD_TRANSACTION:
			return {
				...state,
				transactions: [...state.transactions, action.payload],
			};

		case REMOVE_TRANSACTION:
			return {
				...state,
				transactions: state.transactions.filter(
					(transaction) => transaction._id !== action.payload
				),
			};

    case IS_TRANSACTION_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }

		default:
			return state;
	}
}
