const bcrypt = require('bcrypt');

const { User } = require('../models/userModel');

const DuplicateError = require('../errors/DuplicateError');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');

const { generateToken } = require('../helpers/jwt');

const {
  NOT_FOUND_ERROR_MESSAGE,
  BAD_REQUEST_ERROR_MESSAGE,
  DUPLICATE_ERROR_MESSAGE,
} = require('../helpers/constants');

const {
  MONGO_DUPLICATE_ERROR_CODE,
} = require('../helpers/constants');

const SALT_ROUNDS = 10;

exports.createUser = async (req, res, next) => {
  try {
    const {
      email,
      password,
      name,
    } = req.body;

    const hash = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = await User.create({
      email,
      password: hash,
      name,
    });

    const token = generateToken({ _id: newUser._id });

    res
      .cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      })
      .send({
        email: newUser.email,
        name: newUser.name,
      })
      .end();
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(BAD_REQUEST_ERROR_MESSAGE));
    } else if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
      next(new DuplicateError(DUPLICATE_ERROR_MESSAGE));
    } else {
      next(err);
    }
  }
};

exports.getCurrentUser = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.user._id);

    res.send({
      email: currentUser.email,
      name: currentUser.name,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateCurrentUser = async (req, res, next) => {
  try {
    const { email, name } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { email, name },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedUser) {
      throw new NotFoundError(NOT_FOUND_ERROR_MESSAGE);
    }

    res.send({
      email: updatedUser.email,
      name: updatedUser.name,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(BAD_REQUEST_ERROR_MESSAGE));
    } else if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
      next(new DuplicateError(DUPLICATE_ERROR_MESSAGE));
    } else {
      next(err);
    }
  }
};
