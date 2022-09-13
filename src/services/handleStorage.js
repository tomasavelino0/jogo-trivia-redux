const TOKEN = 'token';
const RANKING = 'ranking';

export const saveToken = (token) => localStorage
  .setItem(TOKEN, token);

const readToken = () => {
  if (!JSON.parse(localStorage.getItem(TOKEN))) {
    localStorage.setItem(TOKEN, JSON.stringify());
  }
  const token = JSON.parse(localStorage.getItem(TOKEN));
  saveToken(token);
};

const saveRanking = (obje) => {
  localStorage.setItem(RANKING, JSON.stringify(obje));
};

export const rankingDetails = (currentObj) => {
  if (localStorage.getItem(RANKING)) {
    const getStorage = localStorage.getItem(JSON.parse(RANKING));
    const rankingAtt = [getStorage, currentObj];
    saveRanking(rankingAtt);
  } else {
    const item = [currentObj];
    localStorage.setItem(RANKING, JSON.stringify(item));
  }
};

export default readToken;
