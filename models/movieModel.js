const mongoose = require('mongoose');
const regexURL = require('../helpers/constants');

const urlValidation = (value) => regexURL.test(value);

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    use: {
      urlValidation,
      message: () => 'Invalid link',
    },
    // validate: {
    //   validator: (value) => urlValidation(value),
    //   message: () => 'Invalid link',
    // },
  },
  trailerLink: {
    type: String,
    required: true,
    use: {
      urlValidation,
      message: () => 'Invalid link',
    },
    // validate: {
    //   validator: (value) => urlValidation(value),
    //   message: () => 'Invalid link',
    // },
  },
  thumbnail: {
    type: String,
    required: true,
    use: {
      urlValidation,
      message: () => 'Invalid link',
    },
    // validate: {
    //   validator: (value) => urlValidation(value),
    //   message: () => 'Invalid link',
    // },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  // movieId — id фильма, который содержится в ответе сервиса MoviesExplorer. Обязательное поле.
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

exports.Movie = mongoose.model('movie', movieSchema);
