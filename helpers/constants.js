const {
  PORT = 3000,
  dataMovies = 'mongodb://localhost:27017/moviesdb',
  NODE_ENV,
  JWT_SECRET,
} = process.env;

const dataMoviesTest = 'mongodb://localhost:27017/moviesdb';

const MONGO_DUPLICATE_ERROR_CODE = 11000;

const SECRET_KEY = 'very_secret';

const NOT_FOUND_ERROR_MESSAGE = "Sorry, we can't find the item you're looking for.";
const FORBIDDEN_ERROR_MESSAGE = "You don't have the authorization for this action.";
const BAD_REQUEST_ERROR_MESSAGE = 'There is invalid data in your request';
const DUPLICATE_ERROR_MESSAGE = 'This email address is already being used';
const UNAUTHORIZED_CREDENTIALS_ERROR_MESSAGE = 'Invalid email address or password';
const UNAUTHORIZED_ERROR_MESSAGE = 'Please authorize yourself.';
const INVALID_LINK_ERROR_MESSAGE = 'Invalid link';
const INVALID_EMAIL_ERROR_MESSAGE = 'Invalid email address';

module.exports = {
  PORT,
  dataMovies,
  NODE_ENV,
  JWT_SECRET,
  dataMoviesTest,
  MONGO_DUPLICATE_ERROR_CODE,
  SECRET_KEY,
  NOT_FOUND_ERROR_MESSAGE,
  FORBIDDEN_ERROR_MESSAGE,
  BAD_REQUEST_ERROR_MESSAGE,
  DUPLICATE_ERROR_MESSAGE,
  UNAUTHORIZED_CREDENTIALS_ERROR_MESSAGE,
  UNAUTHORIZED_ERROR_MESSAGE,
  INVALID_LINK_ERROR_MESSAGE,
  INVALID_EMAIL_ERROR_MESSAGE,
};
