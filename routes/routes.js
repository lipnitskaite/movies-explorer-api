// # создаёт пользователя с переданными в теле
// # email, password и name
// POST /signup

// # проверяет переданные в теле почту и пароль
// # и возвращает JWT
// POST /signin

// Обратите внимание: если сохранять JWT в куках, понадобится дополнительный роут POST /signout.
// При запросе к роуту удалится JWT из куков пользователя.

const routes = require('express').Router();

const { createUserValidation } = require('../middlewares/validation');

const { createUser } = require('../controllers/userController');

routes.post('/signup', createUserValidation, createUser);

exports.routes = routes;
