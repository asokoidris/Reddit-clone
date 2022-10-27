const PostService = require('../service/post-service');
const { successResponse, errorResponse } = require('../utils/response');

/**
 * @description - This is a class that contains methods for post.
 *  @class Controller
 * @exports Controller
 * @classdesc - This is a class that contains methods for post.
 */

class PostController {
  /**
   * @description - This method is used to create a post
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - Returns an object
   * @memberof PostController
   */
  static async createPost(req, res) {
    try {
      const { user } = req;
      const post = await PostService.createPost(req.body, user);
      if (
        post.statusCode === 409 ||
        post.statusCode === 404 ||
        post.statusCode === 403
      )
        return errorResponse(res, post.statusCode, post.message);

      logger.info(`Post created successfully with id: ${JSON.stringify(post)}`);

      return successResponse(res, post.statusCode, post.message, post);
    } catch (error) {
      logger.error(`Error in creating post: ${JSON.stringify(error.message)}`);
      return errorResponse(res, 500, error.message);
    }
  }

  /**
   * @description - This method is used to post by id
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - Returns an object
   * @memberof PostController
   */
  static async getPostById(req, res) {
    try {
      const { user } = req;
      const { id } = req.params;
      const post = await PostService.getPostById(id, user);
      if (post.statusCode === 404 || post.statusCode === 403)
        return errorResponse(res, post.statusCode, post.message);

      logger.info(`Post fetched successfully with id: ${JSON.stringify(post)}`);

      return successResponse(res, post.statusCode, post.message, post);
    } catch (error) {
      logger.error(`Error in fetching post: ${JSON.stringify(error.message)}`);
      return errorResponse(res, 500, error.message);
    }
  }

  /**
   * @description - This method is used to update posts
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - Returns an object
   * @memberof PostController
   * */
  static async updatePost(req, res) {
    try {
      const { body } = req;
      const { id } = req.params;
      const result = await PostService.updatePost(body, id);
      if (result.statusCode == 404)
        return errorResponse(res, result.statusCode, result.message);
      logger.info(
        `Post updated successfully with id: ${JSON.stringify(result)}`
      );
      return successResponse(res, 200, 'Post updated successfully', result);
    } catch (error) {
      logger.error(`Error in updating post: ${JSON.stringify(error)}`);
      return errorResponse(res, 500, 'Oops! Something went wrong');
    }
  }

  /**
   * @description - This method is used to delete posts
   * @param {object} req - The request object
   *  @param {object} res - The response object
   * @returns {object} - Returns an object
   * @memberof PostController
   * */
  static async deletePost(req, res) {
    try {
      const { id } = req.params;
      const result = await PostService.deletePost(id);
      if (result.statusCode == 404)
        return errorResponse(res, result.statusCode, result.message);
      logger.info(
        `Post deleted successfully with id: ${JSON.stringify(result)}`
      );
      return successResponse(res, 200, 'Post deleted successfully', result);
    } catch (error) {
      logger.error(`Error in deleting post: ${JSON.stringify(error)}`);
      return errorResponse(res, 500, 'Oops! Something went wrong');
    }
  }
}

module.exports = PostController;
