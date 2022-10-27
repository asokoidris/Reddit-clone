const express = require('express');
const router = express.Router();
const { validate } = require('../validation/validatorClass');
const {
  createCategorySchema,
  getAllCategoriesSchema,
  getCategoryByIdSchema,
  updateCategorySchema,
  deleteCategorySchema,
} = require('../validation/schema/category');
const CategoryController = require('../controller/category-controller');
const { isUserAuthenticated } = require('../middleware/authentication');

router.post(
  '/',
  isUserAuthenticated,
  validate(createCategorySchema),
  CategoryController.createCategory
);
router.get('/', CategoryController.getAllCategories);
router.get('/:id', CategoryController.getCategoryById);
router.put(
  '/:id',
  isUserAuthenticated,
  validate(updateCategorySchema),
  CategoryController.updateCategory
);
router.delete(
  '/:id',
  isUserAuthenticated,
  validate(deleteCategorySchema),
  CategoryController.deleteCategory
);

module.exports = router;
