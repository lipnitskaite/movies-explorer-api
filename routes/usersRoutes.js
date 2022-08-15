const express = require('express');

const { updateUserValidation } = require('../middlewares/validation');

const {
  getUsers,
  getCurrentUser,
  updateCurrentUser,
} = require('../controllers/userController');

const usersRoutes = express.Router();

usersRoutes.get('/', getUsers);

usersRoutes.get('/me', getCurrentUser);
usersRoutes.patch('/me', updateUserValidation, updateCurrentUser);

exports.usersRoutes = usersRoutes;
