// actions
export const ADD_EMAIL = 'ADD_EMAIL';

export function addEmailAction(email) {
  return {
    type: ADD_EMAIL,
    email,
  };
}

export const getToken = async () => {
  const urlFetch = 'https://opentdb.com/api_token.php?command=request';
  const fetchToken = await fetch(urlFetch);
  const responseToken = await fetchToken.json();
  return responseToken.token;
};
