const Joi = require('@hapi/joi');

const validationSchema = Joi.object().keys({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
});

module.exports = validationSchema;
