const { checkToken } = require('../helpers/jwt');

const UnauthorizedError = require('../errors/UnauthorizedError');

const { unauthorizedErrorMessage } = require('../helpers/constants');

exports.auth = async (req, res, next) => {
  const { jwt } = req.cookies;
  let payload;
  try {
    payload = checkToken(jwt);
  } catch (err) {
    next(new UnauthorizedError(unauthorizedErrorMessage));
    return;
  }
  req.user = { _id: payload._id.toString() };

  next();
};
