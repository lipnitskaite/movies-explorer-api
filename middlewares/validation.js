const { celebrate, Joi } = require('celebrate');
const { isEmail, isURL } = require('validator');

const {
  INVALID_EMAIL_ERROR_MESSAGE,
  INVALID_LINK_ERROR_MESSAGE,
} = require('../helpers/constants');

exports.createUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email({
        minDomainSegments: 2,
      })
      .custom((value, error) => {
        if (isEmail(value)) {
          return value;
        }
        return error.message(INVALID_EMAIL_ERROR_MESSAGE);
      }),
    password: Joi.string()
      .required(),
    name: Joi.string()
      .required()
      .min(2)
      .max(30),
  }),
});

exports.signInUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email({
        minDomainSegments: 2,
      })
      .custom((value, error) => {
        if (isEmail(value)) {
          return value;
        }
        return error.message(INVALID_EMAIL_ERROR_MESSAGE);
      }),
    password: Joi.string()
      .required(),
  }),
});

exports.updateUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email({
        minDomainSegments: 2,
      })
      .custom((value, error) => {
        if (isEmail(value)) {
          return value;
        }
        return error.message(INVALID_EMAIL_ERROR_MESSAGE);
      }),
    name: Joi.string()
      .required()
      .min(2)
      .max(30),
  }),
});

exports.createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string()
      .required(),
    director: Joi.string()
      .required(),
    duration: Joi.number()
      .required(),
    year: Joi.string()
      .required(),
    description: Joi.string()
      .required(),
    image: Joi.string()
      .required()
      .custom((value, error) => {
        if (isURL(value)) {
          return value;
        }
        return error.message(INVALID_LINK_ERROR_MESSAGE);
      }),
    trailerLink: Joi.string()
      .required()
      .custom((value, error) => {
        if (isURL(value)) {
          return value;
        }
        return error.message(INVALID_LINK_ERROR_MESSAGE);
      }),
    thumbnail: Joi.string()
      .required()
      .custom((value, error) => {
        if (isURL(value)) {
          return value;
        }
        return error.message(INVALID_LINK_ERROR_MESSAGE);
      }),
    movieId: Joi.number()
      .required(),
    nameRU: Joi.string()
      .required(),
    nameEN: Joi.string()
      .required(),
  }),
});

exports.cardIDValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().min(24).max(24).hex(),
  }),
});
