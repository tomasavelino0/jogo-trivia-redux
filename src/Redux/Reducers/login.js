import { ADD_EMAIL, ADD_NAME, ADD_TOKEN } from '../Actions';

const INITIAL_STATE = {
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
  default: return state;
  }
}

export default loginReducer;
