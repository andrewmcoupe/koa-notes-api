const Joi = require('@hapi/joi');

const noteSchema = Joi.object().keys({
  title: Joi.string()
    .min(2)
    .required(),
  body: Joi.string()
    .min(2)
    .required()
});

module.exports = {
  noteSchema
};
