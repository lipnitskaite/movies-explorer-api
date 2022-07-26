const { Movie } = require('../models/movieModel');

const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const BadRequestError = require('../errors/BadRequestError');

const {
  NOT_FOUND_ERROR_MESSAGE,
  FORBIDDEN_ERROR_MESSAGE,
  BAD_REQUEST_ERROR_MESSAGE,
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
      _id: newMovie._id,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(BAD_REQUEST_ERROR_MESSAGE));
    } else {
      next(err);
    }
  }
};

exports.doesMovieExist = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      throw new NotFoundError(NOT_FOUND_ERROR_MESSAGE);
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

      res.send(movie);
    } else {
      throw new ForbiddenError(FORBIDDEN_ERROR_MESSAGE);
    }
  } catch (err) {
    next(err);
  }
};
