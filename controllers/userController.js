const bcrypt = require('bcrypt');

const { User } = require('../models/userModel');

const DuplicateError = require('../errors/DuplicateError');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');

const {
  notFoundErrorMessage,
  badRequestErrorMessage,
  duplicateErrorMessage,
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

    res.send({
      email: newUser.email,
      name: newUser.name,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(badRequestErrorMessage));
    } else if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
      next(new DuplicateError(duplicateErrorMessage));
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
      throw new NotFoundError(notFoundErrorMessage);
    }

    res.send({
      email: updatedUser.email,
      name: updatedUser.name,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(badRequestErrorMessage));
    } else if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
      next(new DuplicateError(duplicateErrorMessage));
    } else {
      next(err);
    }
  }
};
