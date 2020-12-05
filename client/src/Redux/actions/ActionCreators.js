import {
	GET_TRANSACTIONS,
	ADD_TRANSACTION,
	REMOVE_TRANSACTION,
	IS_TRANSACTION_LOADING,
} from "./types";
import axios from "axios";
import { tokenConfig } from "./AuthActions";

// get all the transactions
export const getTransactions = () => (dispatch, getState) => {
	dispatch({ type: IS_TRANSACTION_LOADING, payload: true });
	axios.get("/api/transactions/", tokenConfig(getState)).then((res) => {
		dispatch({ type: GET_TRANSACTIONS, payload: res.data });
		dispatch({ type: IS_TRANSACTION_LOADING, payload: false });
	});
};

// create a new transaction
export const addTransaction = (transaction) => (dispatch, getState) => {
	const { title, amount } = transaction;

	dispatch({ type: IS_TRANSACTION_LOADING, payload: true });
	axios
		.post("/api/transactions/", { title, amount }, tokenConfig(getState))
		.then((res) => {
			dispatch({ type: ADD_TRANSACTION, payload: res.data });
			dispatch({ type: IS_TRANSACTION_LOADING, payload: false });
		});
};

// remove a transaction
export const removeTransaction = (_id) => (dispatch, getState) => {
	dispatch({ type: IS_TRANSACTION_LOADING, payload: true });
	axios
		.delete(`/api/transactions/${_id}`, tokenConfig(getState))
		.then((res) => {
			dispatch({ type: REMOVE_TRANSACTION, payload: _id });
			dispatch({ type: IS_TRANSACTION_LOADING, payload: false });
		});
};
