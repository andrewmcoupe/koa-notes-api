const Joi = require('@hapi/joi');

function isValid(req, validationSchema) {
  return Joi.validate(req, validationSchema);
}

module.exports = {
  isValid
};
