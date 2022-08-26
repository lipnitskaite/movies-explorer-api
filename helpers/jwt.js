const jwt = require('jsonwebtoken');

const {
  NODE_ENV,
  JWT_SECRET,
  SECRET_KEY,
  UNAUTHORIZED_ERROR_MESSAGE,
} = require('./constants');

const UnauthorizedError = require('../errors/UnauthorizedError');

const generateToken = (payload) => jwt.sign(
  payload,
  NODE_ENV === 'production' ? JWT_SECRET : SECRET_KEY,
  { expiresIn: '7d' },
);

const checkToken = (token) => {
  if (!token) {
    throw new UnauthorizedError(UNAUTHORIZED_ERROR_MESSAGE);
  }

  return jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : SECRET_KEY);
};

module.exports = { generateToken, checkToken };
