const { celebrate, Joi } = require('celebrate');

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
