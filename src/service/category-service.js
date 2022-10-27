const CategoryModel = require('../model/category');
const HelperFunctions = require('../utils/helper-functions');
const { successResponse, errorResponse } = require('../utils/response');

/**
 * @description - This is a class that contains methods for category.
 *
 */
class CategoryService {
  /**
   * @description - This method is used to create a category
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - Returns an object
   * @memberof CategoryService
   *  */
  static async createCategory(data) {
    const { name } = data;
    data.name = HelperFunctions.capitalizeFirstLetter(name);

    const category = await CategoryModel.findOne({
      name,
    });
    if (category)
      return {
        statusCode: 409,
        message: 'Category already exists',
      };
    const newCategory = await CategoryModel.create(data);

    logger.info(`Category created with name: ${name}`);
    return {
      statusCode: 201,
      message: 'Category created successfully',
      data: newCategory,
    };
  }

  /**
   * @description - This method is used to get all categories
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - Returns an object
   * @memberof CategoryService
   * */
  static async getAllCategories() {
    const categories = await CategoryModel.find();
    if (!categories)
      return {
        statusCode: 404,
        message: 'Categories not found',
      };
    return {
      statusCode: 200,
      message: 'Categories retrieved successfully',
      data: categories,
    };
  }

  /**
   * @description - This method is used to get a category by id
   *
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - Returns an object
   * @memberof CategoryService
   * */
  static async getCategoryById(id) {
    const validMongoId = HelperFunctions.isValidMongoId(id);
    if (!validMongoId)
      return {
        statusCode: 400,
        message: 'Category not found',
      };

    const category = await CategoryModel.findById(id);
    if (!category)
      return {
        statusCode: 404,
        message: 'Category not found',
      };
    return {
      statusCode: 200,
      message: 'Category retrieved successfully',
      data: category,
    };
  }

  /**
   * @description - This method is used to update a category
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - Returns an object
   * @memberof CategoryService
   * */
  static async updateCategory(id, data) {
    const { name, value } = data;
    const validMongoId = HelperFunctions.isValidMongoId(id);

    if (!validMongoId)
      return {
        statusCode: 400,
        message: 'Category not found',
      };

    const category = await CategoryModel.findById(id);

    if (!category)
      return {
        statusCode: 404,
        message: 'Category not found',
      };

    if (name) data.name = HelperFunctions.capitalizeFirstLetter(name);
    if (value) data.value = HelperFunctions.capitalizeFirstLetter(value);
    try {
      const updatedCategory = await CategoryModel.findByIdAndUpdate(
        id,
        { ...data },
        { new: true }
      );
      return {
        statusCode: 200,
        message: 'Category updated successfully',
        data: updatedCategory,
      };
    } catch (error) {
      return {
        statusCode: 200,
        message: `${error}`,
        data: updatedCategory,
      };
    }
  }

  /**
   *
   * @description - This method is used to delete a category
   *
   *
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - Returns an object
   * @memberof CategoryService
   * */
  static async deleteCategory(id) {
    const category = await CategoryModel.findByIdAndDelete(id);
    if (!category)
      return {
        statusCode: 404,
        message: 'Category not found',
      };
    return {
      statusCode: 200,
      message: 'Category deleted successfully',
      data: category,
    };
  }
}

module.exports = CategoryService;
