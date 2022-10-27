const joi = require('joi');
const mongoose = require('mongoose');
const { validateMongoId } = require('../../utils/helper-functions');

const createCategorySchema = joi.object({
  name: joi.string().required(),
  value: joi.string().required(),
});
const getAllCategoriesSchema = joi.object({
  name: joi.string(),
  value: joi.string(),
});
const getCategoryByIdSchema = joi.object({
  id: joi.string().required(),
});
const updateCategorySchema = joi
  .object({
    name: joi.string(),
    value: joi.string(),
  })
  .or('name', 'value');

const deleteCategorySchema = joi.object({
  id: joi.string().required(),
});

module.exports = {
  createCategorySchema,
  getAllCategoriesSchema,
  getCategoryByIdSchema,
  updateCategorySchema,
  deleteCategorySchema,
};
