import { ADD_EMAIL } from '../Actions';

const INITIAL_STATE = {
  email: '',
};

function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EMAIL: return {
    ...state, email: action.email,
  };
  default: return state;
  }
}

export default loginReducer;
