import { combineReducers } from 'redux';
import TransactionReducer from './TransactionReducer';
import AuthReducer from './AuthReducer';
import ErrorReducer from './ErrorReducer';

export default combineReducers({ transactions: TransactionReducer, auth: AuthReducer, errors: ErrorReducer })
