const { successResponse, errorResponse } = require('../utils/response');
const commentService = require('../service/comment-service');

/**
 * @description - This is a class that contains methods for comment.
 *
 * @class Controller
 * @exports Controller
 * @classdesc - This is a class that contains methods for comment.
 */
class CommentController {
  /**
   * @description - This method is used to create a comment
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - Returns an object
   * @memberof CommentController
   */
  static async createComment(req, res) {
    try {
      const { user } = req;
      const comment = await commentService.createComment(req.body, user);
      if (comment.statusCode === 409 || comment.statusCode === 404) {
        return errorResponse(res, comment.statusCode, comment.message);
      }
      return successResponse(res, comment.statusCode, comment.message, comment);
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  /**
   * @description - This method is used to get all comments
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - Returns an object
   * @memberof CommentController
   * */
  static async getAllComments(req, res) {
    try {
      const { user, query } = req;
      const comments = await commentService.getAllComments(user, query);
      if (comments.statusCode === 404) {
        return errorResponse(res, comments.statusCode, comments.message);
      }
      return successResponse(
        res,
        comments.statusCode,
        comments.message,
        comments
      );
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  /**
   * @description - This method is used to get a comment by id
   *
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - Returns an object
   * @memberof CommentController
   * */
  static async getCommentById(req, res) {
    try {
      const { user } = req;
      const { id } = req.params;
      const comment = await commentService.getCommentById(id, user);
      if (comment.statusCode === 404) {
        return errorResponse(res, comment.statusCode, comment.message);
      }
      return successResponse(res, comment.statusCode, comment.message, comment);
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  /**
   * @description - This method is used to update a comment
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - Returns an object
   * @memberof CommentController
   * */
  static async updateComment(req, res) {
    try {
      const { user } = req;
      const { id } = req.params;
      const comment = await commentService.updateComment(id, req.body, user);
      if (comment.statusCode === 404) {
        return errorResponse(res, comment.statusCode, comment.message);
      }
      return successResponse(res, comment.statusCode, comment.message, comment);
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }
  /**
   * @description - This method is used to delete a comment
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - Returns an object
   * @memberof CommentController
   * */
  static async deleteComment(req, res) {
    try {
      const { user } = req;
      const { id } = req.params;
      const comment = await commentService.deleteComment(id, user);
      if (comment.statusCode === 404) {
        return errorResponse(res, comment.statusCode, comment.message);
      }
      return successResponse(res, comment.statusCode, comment.message, comment);
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }
}

module.exports = CommentController;
