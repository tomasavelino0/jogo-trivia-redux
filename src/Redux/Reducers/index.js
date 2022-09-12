import { combineReducers } from 'redux';
import loginReducer from './login';
import scorePointsReducer from './gameReducer';

const reducer = combineReducers({ loginReducer, scorePointsReducer });

export default reducer;
