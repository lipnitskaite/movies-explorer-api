const express = require('express');

const { createMovieValidation, cardIDValidation } = require('../middlewares/validation');

const {
  createMovie,
  doesMovieExist,
  getMovies,
  deleteMovieByID,
} = require('../controllers/movieController');

const moviesRoutes = express.Router();

moviesRoutes.get('/', getMovies);

moviesRoutes.post('/', createMovieValidation, createMovie);

moviesRoutes.delete('/:id', cardIDValidation, doesMovieExist, deleteMovieByID);

exports.moviesRoutes = moviesRoutes;
