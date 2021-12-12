const validator = require('validator');

const urlValidator = (value, helper) => {
  if (!validator.isURL(value,  { require_protocol: true })) {
    return helper.message("Invalid URL")
  }
  return true
};

module.exports = {
  urlValidator
}