import { ADD_EMAIL, ADD_NAME, ADD_TOKEN, SCORE_POINTS, NO_SCORE } from '../Actions';

const INITIAL_STATE = {
  score: 0,
  email: '',
  name: '',
  token: '',
};

function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EMAIL: return {
    ...state, email: action.email,
  };
  case ADD_NAME: return {
    ...state, name: action.name,
  };
  case ADD_TOKEN: return {
    ...state, token: action.token,
  };
  case SCORE_POINTS: return {
    ...state, score: action.points,
  };
  case NO_SCORE: return {
    ...state,
  };
  default: return state;
  }
}

export default loginReducer;
