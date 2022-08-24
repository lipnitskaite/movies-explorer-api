const {
  PORT = 3000,
  dataMovies = 'mongodb://localhost:27017/moviesdb',
  NODE_ENV,
  JWT_SECRET,
} = process.env;

const regexURL = /^(https?:\/\/\w+[.\-\w]*)+(\.[a-z]{1,3})+(\/[\w\-.~:\\/?#[\]@!$&'()*+,;=]*)*#?$/i;

const dataMoviesTest = 'mongodb://localhost:27017/moviesdb';

const MONGO_DUPLICATE_ERROR_CODE = 11000;

const SECRET_KEY = 'very_secret';

const notFoundErrorMessage = "Sorry, we can't find the item you're looking for.";
const forbiddenErrorMessage = "You don't have the authorization for this action.";
const badRequestErrorMessage = 'There is invalid data in your request';
const duplicateErrorMessage = 'This email address is already being used';
const unauthorizedCredentialsErrorMessage = 'Invalid email address or password';
const unauthorizedErrorMessage = 'Please authorize yourself.';

module.exports = {
  PORT,
  dataMovies,
  NODE_ENV,
  JWT_SECRET,
  regexURL,
  dataMoviesTest,
  MONGO_DUPLICATE_ERROR_CODE,
  SECRET_KEY,
  notFoundErrorMessage,
  forbiddenErrorMessage,
  badRequestErrorMessage,
  duplicateErrorMessage,
  unauthorizedCredentialsErrorMessage,
  unauthorizedErrorMessage,
};
