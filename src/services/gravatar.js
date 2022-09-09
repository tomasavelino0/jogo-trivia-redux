import md5 from 'crypto-js/md5';

const getHashGravatar = (email) => {
  const emailGravatar = md5(email).toString();
  return `https://www.gravatar.com/avatar/${emailGravatar}`;
};

export default getHashGravatar;
