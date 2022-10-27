const CategoryService = require('../service/category-service');
const { successResponse, errorResponse } = require('../utils/response');

/**
 * @description - This is a class that contains methods for category.
 *
 *  */
class CategoryController {
  /**
   * @description - This method is used to create a category
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - Returns an object
   * @memberof CategoryController
   *  */
  static async createCategory(req, res) {
    try {
      const category = await CategoryService.createCategory(req.body, req.user);
      if (category.statusCode === 409) {
        return errorResponse(res, category.statusCode, category.message);
      }
      return successResponse(res, category.statusCode, category.message, {
        category,
      });
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  /**
   * @description - This method is used to get all categories
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - Returns an object
   * @memberof CategoryController
   * */
  static async getAllCategories(req, res) {
    try {
      const categories = await CategoryService.getAllCategories(req.user);
      if (categories.statusCode === 404) {
        return errorResponse(res, categories.statusCode, categories.message);
      }
      return successResponse(res, categories.statusCode, categories.message, {
        categories,
      });
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  /**
   * @description - This method is used to get a category by id
   *
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - Returns an object
   * @memberof CategoryController
   * */
  static async getCategoryById(req, res) {
    try {
      const { id } = req.params;
      const category = await CategoryService.getCategoryById(id, req.user);
      if (category.statusCode === 404) {
        return errorResponse(res, category.statusCode, category.message);
      }
      return successResponse(res, category.statusCode, category.message, {
        category,
      });
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  /**
   * @description - This method is used to update a category
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - Returns an object
   * @memberof CategoryController
   * */
  static async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const category = await CategoryService.updateCategory(
        id,
        req.body,
        req.user
      );
      if (category.statusCode === 404) {
        return errorResponse(res, category.statusCode, category.message);
      }
      return successResponse(res, category.statusCode, category.message, {
        category,
      });
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  /**
   * @description - This method is used to delete a category
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - Returns an object
   *  @memberof CategoryController
   * */
  static async deleteCategory(req, res) {
    try {
      const { id } = req.params;
      const category = await CategoryService.deleteCategory(id, req.user);
      if (category.statusCode === 404) {
        return errorResponse(res, category.statusCode, category.message);
      }
      return successResponse(res, category.statusCode, category.message, {
        category,
      });
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }
}

module.exports = CategoryController;
