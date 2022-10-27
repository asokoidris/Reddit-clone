const joi = require('joi');

const createCommunitySchema = joi.object({
  name: joi.string().required(),
  username: joi.string().required(),
  description: joi.string().required(),
  image: joi.string().required(),
  cover: joi.string().required(),
  category: joi.array().items(joi.string()).required(),
  rules: joi.string(),
  privacy: joi.string(),
  flairs: joi.object(),
  theme: joi.object({ main: joi.string(), highlight: joi.string() }),
});

const updateCommunitySchema = joi.object({
  name: joi.string(),
  username: joi.string(),
  description: joi.string(),
  image: joi.string(),
  cover: joi.string(),
  category: joi.array().items(joi.string()),
  rules: joi.string(),
  privacy: joi.string(),
  flairs: joi.object(),
  theme: joi.object({ main: joi.string(), highlight: joi.string() }),
});

module.exports = {
  createCommunitySchema,
  updateCommunitySchema,
};
