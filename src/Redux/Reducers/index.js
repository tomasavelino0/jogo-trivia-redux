import { combineReducers } from 'redux';
import loginReducer from './login';

const reducer = combineReducers({ loginReducer });

export default reducer;
