const { Movie } = require('../models/movieModel');

const DublicateError = require('../errors/DublicateError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const MONGO_DUPLICATE_ERROR_CODE = require('../helpers/constants');

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
    if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
      err = new DublicateError('This movie has been already created');
    }

    next(err);
  }
};

exports.doesMovieExist = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      throw new NotFoundError("Sorry, we can't find the movie you're looking for.");
    }
  } catch (err) {
    next(err);
  }

  next();
};

exports.getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({});

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
      throw new ForbiddenError("You don't have the authorization to remove other users' movies");
    }
  } catch (err) {
    next(err);
  }
};
