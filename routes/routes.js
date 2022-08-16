// # проверяет переданные в теле почту и пароль
// # и возвращает JWT
// POST /signin

// Обратите внимание: если сохранять JWT в куках, понадобится дополнительный роут POST /signout.
// При запросе к роуту удалится JWT из куков пользователя.

const routes = require('express').Router();

const { createUserValidation } = require('../middlewares/validation');

const { createUser } = require('../controllers/userController');

const { usersRoutes } = require('./usersRoutes');
const { moviesRoutes } = require('./moviesRoutes');

routes.post('/signup', createUserValidation, createUser);

routes.use('/users', usersRoutes);
routes.use('/movies', moviesRoutes);

exports.routes = routes;
