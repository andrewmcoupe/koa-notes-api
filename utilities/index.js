const Joi = require('@hapi/joi');

function isValid(req, validationSchema) {
  const result = Joi.validate(req.body, validationSchema);

  return result;
}

module.exports = {
  isValid
};
