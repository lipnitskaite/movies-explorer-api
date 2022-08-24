const routes = require('express').Router();

const { createUserValidation, signInUserValidation } = require('../middlewares/validation');

const { auth } = require('../middlewares/auth');

const { createUser } = require('../controllers/userController');
const { signInUser, signOutUser } = require('../controllers/loginController');

const { usersRoutes } = require('./usersRoutes');
const { moviesRoutes } = require('./moviesRoutes');

const NotFoundError = require('../errors/NotFoundError');

const { notFoundErrorMessage } = require('../helpers/constants');

routes.post('/signup', createUserValidation, createUser);
routes.post('/signin', signInUserValidation, signInUser);

routes.use(auth);

routes.get('/signout', signOutUser);

routes.use('/users', usersRoutes);
routes.use('/movies', moviesRoutes);

routes.all('*', () => {
  throw new NotFoundError(notFoundErrorMessage);
});

exports.routes = routes;
