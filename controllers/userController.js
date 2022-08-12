const bcrypt = require('bcrypt');

const { User } = require('../models/userModel');

const DublicateError = require('../errors/DublicateError');

const MONGO_DUPLICATE_ERROR_CODE = 11000;
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
