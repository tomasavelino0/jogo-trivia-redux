const TOKEN = 'token';

export const saveToken = (token) => localStorage
  .setItem(TOKEN, token);

const readToken = () => {
  if (!JSON.parse(localStorage.getItem(TOKEN))) {
    localStorage.setItem(TOKEN, JSON.stringify());
  }
  const token = JSON.parse(localStorage.getItem(TOKEN));
  saveToken(token);
};

export default readToken;
