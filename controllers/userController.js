const bcrypt = require('bcrypt');

const { User } = require('../models/userModel');

const DublicateError = require('../errors/DublicateError');
const NotFoundError = require('../errors/NotFoundError');

const { MONGO_DUPLICATE_ERROR_CODE } = require('../helpers/constants');

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
    if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
      // eslint-disable-next-line no-ex-assign
      err = new DublicateError('This email address is already being used');
    }

    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});

    res.send(users);
  } catch (err) {
    next(err);
  }
};

exports.getCurrentUser = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.user._id);

    res.send({
      email: currentUser.email,
      name: currentUser.name,
      id: currentUser._id,
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
      throw new NotFoundError("Sorry, we can't find the user you're looking for.");
    }

    res.send(updatedUser);
  } catch (err) {
    next(err);
  }
};
