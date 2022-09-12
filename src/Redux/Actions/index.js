// actions
export const ADD_EMAIL = 'ADD_EMAIL';
export const SETTINGS = 'SETTINGS';
export const ADD_NAME = 'ADD_NAME';
export const SCORE_POINTS = 'SCORE_POINTS';
export const NO_SCORE = 'NO_SCORE';
export const ADD_TOKEN = 'ADD_TOKEN';

export const addToken = (token) => ({
  type: ADD_TOKEN,
  token,
});

export const scoredPoints = (points) => ({
  type: SCORE_POINTS,
  points,
});

export const noScoredPoints = () => ({ type: NO_SCORE });

export const settings = () => ({ type: SETTINGS });

export function addEmailAction(email) {
  return {
    type: ADD_EMAIL,
    email,
  };
}

export function addName(name) {
  return {
    type: ADD_NAME,
    name,
  };
}

export const getToken = async () => {
  const urlFetch = 'https://opentdb.com/api_token.php?command=request';
  const fetchToken = await fetch(urlFetch);
  const responseToken = await fetchToken.json();
  return responseToken.token;
};
