const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: () => 'Invalid email address',
    },
  },
  password: {
    type: String,
    required: true,
    // Нужно задать поведение по умолчанию, чтобы база данных не возвращала это поле ???
  },
  name: {
    type: String,
    required: true,
    minLength: [2, 'The name should be a minimum of 2 characters in length'],
    maxLength: [30, 'The name should be a maximum of 30 characters in length'],
  },
});

module.exports = mongoose.model('user', userSchema);
