const Joi = require('joi');
// const app = require('express')();
const validator = require('express-joi-validation').createValidator({});

exports.bodySchema = Joi.object({
  value: Joi.string().required(),
});

exports.paramSchema = Joi.object({
  key: Joi.string().required(),
});
