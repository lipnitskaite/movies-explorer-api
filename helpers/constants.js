const regexURL = /^(https?:\/\/\w+[.\-\w]*)+(\.[a-z]{1,3})+(\/[\w\-.~:\\/?#[\]@!$&'()*+,;=]*)*#?$/i;

const mongodbURL = 'mongodb://localhost:27017/moviesdb';

const MONGO_DUPLICATE_ERROR_CODE = 11000;

const SECRET_KEY = 'very_secret';

module.exports = {
  regexURL,
  mongodbURL,
  MONGO_DUPLICATE_ERROR_CODE,
  SECRET_KEY,
};
