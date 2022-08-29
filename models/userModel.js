const mongoose = require('mongoose');
const validator = require('validator');

const { INVALID_EMAIL_ERROR_MESSAGE } = require('../helpers/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: () => INVALID_EMAIL_ERROR_MESSAGE,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minLength: [2, 'The name should be a minimum of 2 characters in length'],
    maxLength: [30, 'The name should be a maximum of 30 characters in length'],
  },
});

exports.User = mongoose.model('user', userSchema);
