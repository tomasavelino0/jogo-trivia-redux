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
  const moreItensStorage = localStorage.getItem(RANKING);
  const parseSavedItens = JSON.parse(moreItensStorage);
  if (!parseSavedItens) {
    const item = [currentObj];
    localStorage.setItem(RANKING, JSON.stringify(item));
  } else {
    const getStorage = localStorage.getItem(RANKING);
    const parsedStorage = JSON.parse(getStorage);
    const rankingAtt = [...parsedStorage, currentObj];
    saveRanking(rankingAtt);
  }
};

export default readToken;
