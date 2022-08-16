const { celebrate, Joi } = require('celebrate');

const { regexURL } = require('../helpers/constants');

exports.createUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email({
        minDomainSegments: 2,
      }),
    password: Joi.string()
      .required(),
    name: Joi.string()
      .min(2)
      .max(30),
  }),
});

exports.updateUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email({
        minDomainSegments: 2,
      }),
    name: Joi.string()
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
      .custom((value, helpers) => {
        if (!regexURL.test(value)) {
          return helpers.message('Invalid link');
        }
        return value;
      }),
    trailerLink: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (!regexURL.test(value)) {
          return helpers.message('Invalid link');
        }
        return value;
      }),
    thumbnail: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (!regexURL.test(value)) {
          return helpers.message('Invalid link');
        }
        return value;
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
