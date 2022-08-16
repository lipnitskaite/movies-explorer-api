// # проверяет переданные в теле почту и пароль
// # и возвращает JWT
// POST /signin

// Обратите внимание: если сохранять JWT в куках, понадобится дополнительный роут POST /signout.
// При запросе к роуту удалится JWT из куков пользователя.

const routes = require('express').Router();

const { createUserValidation } = require('../middlewares/validation');

const { auth } = require('../middlewares/auth');

const { createUser } = require('../controllers/userController');

const { usersRoutes } = require('./usersRoutes');
const { moviesRoutes } = require('./moviesRoutes');

const NotFoundError = require('../errors/NotFoundError');

routes.post('/signup', createUserValidation, createUser);

routes.use(auth);

routes.use('/users', usersRoutes);
routes.use('/movies', moviesRoutes);

routes.all('*', (req, res, next) => {
  throw new NotFoundError("Sorry, we can't find the page you're looking for.");

  // eslint-disable-next-line no-undef, no-unreachable
  next(err);
});

exports.routes = routes;
