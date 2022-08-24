const { Movie } = require('../models/movieModel');

const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const BadRequestError = require('../errors/BadRequestError');

const {
  notFoundErrorMessage,
  forbiddenErrorMessage,
  badRequestErrorMessage,
} = require('../helpers/constants');

exports.createMovie = async (req, res, next) => {
  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
    } = req.body;

    const newMovie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      owner: req.user._id,
      movieId,
      nameRU,
      nameEN,
    });

    res.send({
      country: newMovie.country,
      director: newMovie.director,
      duration: newMovie.duration,
      year: newMovie.year,
      description: newMovie.description,
      image: newMovie.image,
      trailerLink: newMovie.trailerLink,
      thumbnail: newMovie.thumbnail,
      movieId: newMovie.movieId,
      nameRU: newMovie.nameRU,
      nameEN: newMovie.nameEN,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(badRequestErrorMessage));
    } else {
      next(err);
    }
  }
};

exports.doesMovieExist = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      throw new NotFoundError(notFoundErrorMessage);
    }
  } catch (err) {
    next(err);
  }

  next();
};

exports.getMovies = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const movies = await Movie.find({ owner });

    res.send(movies);
  } catch (err) {
    next(err);
  }
};

exports.deleteMovieByID = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (req.user._id === movie.owner.toString()) {
      await Movie.findByIdAndDelete(req.params.id);

      res.send({ message: 'The movie is removed' });
    } else {
      throw new ForbiddenError(forbiddenErrorMessage);
    }
  } catch (err) {
    next(err);
  }
};
