const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const { SECRET_KEY } = require('./constants');

const UnauthorizedError = require('../errors/UnauthorizedError');

const generateToken = (payload) => jwt.sign(
  payload,
  NODE_ENV === 'production' ? JWT_SECRET : SECRET_KEY,
  { expiresIn: '7d' },
);

const checkToken = (token) => {
  if (!token) {
    throw new UnauthorizedError('Please authorize yourself.');
  }

  return jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : SECRET_KEY);
};

module.exports = { generateToken, checkToken };
