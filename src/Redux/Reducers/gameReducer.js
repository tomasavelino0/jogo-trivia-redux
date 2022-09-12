import { SCORE_POINTS, NO_SCORE } from '../Actions';

const INITIAL_STATE = {
  score: 0,
};

function scorePointsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SCORE_POINTS: return {
    ...state, score: action.points,
  };
  case NO_SCORE: return {
    ...state,
  };
  default: return state;
  }
}

export default scorePointsReducer;
