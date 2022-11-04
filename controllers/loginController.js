const bcrypt = require('bcrypt');

const { User } = require('../models/userModel');

const UnauthorizedError = require('../errors/UnauthorizedError');

const { generateToken } = require('../helpers/jwt');
const { UNAUTHORIZED_CREDENTIALS_ERROR_MESSAGE } = require('../helpers/constants');

exports.signInUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email }).select('+password');

    if (!foundUser) {
      throw new UnauthorizedError(UNAUTHORIZED_CREDENTIALS_ERROR_MESSAGE);
    }

    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedError(UNAUTHORIZED_CREDENTIALS_ERROR_MESSAGE);
    }

    const token = generateToken({ _id: foundUser._id });

    res
      .cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      })
      .send({ message: 'Successfully logged in.' })
      .end();
  } catch (err) {
    next(err);
  }
};

exports.signOutUser = async (req, res, next) => {
  try {
    res.clearCookie('jwt', {
      maxAge: 360000 * 24 * 7,
      httpOnly: true,
      sameSite: 'none',
    })
      .send({ message: 'The user has logged out' });
  } catch (err) {
    next(err);
  }
};
