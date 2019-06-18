const Joi = require('@hapi/joi');

const noteSchema = Joi.object().keys({
  title: Joi.string()
    .min(2)
    .required(),
  body: Joi.string()
    .min(2)
    .required()
});

const userSchema = Joi.object().keys({
  name: Joi.string()
    .min(2)
    .max(255)
    .required(),
  email: Joi.string()
    .min(2)
    .max(255)
    .email()
    .required(),
  password: Joi.string()
    .min(2)
    .max(255)
    .required()
});

module.exports = {
  noteSchema,
  userSchema
};
