const express = require('express');

const { updateUserValidation } = require('../middlewares/validation');

const {
  getCurrentUser,
  updateCurrentUser,
} = require('../controllers/userController');

const usersRoutes = express.Router();

usersRoutes.get('/me', getCurrentUser);
usersRoutes.patch('/me', updateUserValidation, updateCurrentUser);

exports.usersRoutes = usersRoutes;
