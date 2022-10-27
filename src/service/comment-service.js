const CommentModel = require('../model/comment');
const PostModel = require('../model/post');
const { validateObjectId } = require('../utils/helper-functions');
const AuditLogService = require('./audit-log-service');

/**
 * @description - This is a class that contains methods for comment.
 * @class CommentService
 * @exports CommentService
 * @classdesc - This is a class that contains methods for comment.
 */
class CommentService {
  /**
   * @description - This method is used to create a comment
   * @param {object} data - The comment data
   * @param {object} user - The user data
   * @returns {object} - Returns an object
   * @memberof CommentService
   */
  static async createComment(data, user) {
    const createdComment = await CommentModel.create({
      ...data,
      userId: user._id,
    });

    // check if the comment was created
    if (data.commentId) {
      // update existing comment with the new comment id
      await CommentModel.findByIdAndUpdate(data.commentId, {
        $push: { replies: createdComment._id },
      });

      return {
        statusCode: 201,
        message: 'Comment created successfully',
        data: createdComment,
      };
    }

    if (data.postId) {
      // update existing comment with the new comment id
      await PostModel.findByIdAndUpdate(data.postId, {
        $push: { comments: createdComment._id },
      });

      // update the audit log
      await AuditLogService.createAuditLog({
        action: 'comment',
        resource: 'comment',
        modelId: data.commentId || data.postId,
        userId: user.id,
      });

      return {
        statusCode: 201,
        message: 'Comment created successfully',
        data: createdComment,
      };
    }

    return {
      statusCode: 201,
      message: 'Comment created successfully',
      data: createdComment,
    };
  }

  /**
   * @description - This method is used to get all comments
   * @param {object} user - The user data
   * @param {object} query - The query object
   * @returns {object} - Returns an object
   * @memberof CommentService
   * */
  static async getAllComments(user, query) {
    const { _id: userId } = user;
    const { articleId } = query;
    const comments = await CommentModel.find({ articleId, userId });
    if (!comments.length)
      return {
        statusCode: 404,
        message: 'No comment found',
      };

    return {
      statusCode: 200,
      message: 'Comments retrieved successfully',
      data: comments,
    };
  }

  /**
   * @description - This method is used to get a comment by id
   *
   * @param {object} user - The user data
   * @param {object} params - The params object
   * @returns {object} - Returns an object
   * @memberof CommentService
   * */
  static async getCommentById(user, params) {
    const { _id: userId } = user;
    const { commentId } = params;
    const isValidObjectId = validateObjectId(commentId);
    if (!isValidObjectId)
      return {
        statusCode: 400,
        message: 'Invalid comment id',
      };
    const comment = await CommentModel.findOne({ _id: commentId, userId });
    if (!comment)
      return {
        statusCode: 404,
        message: 'Comment not found',
      };
    return {
      statusCode: 200,
      message: 'Comment retrieved successfully',
      data: comment,
    };
  }

  /**
   * @description - This method is used to update a comment
   * @param {object} user - The user data
   * @param {object} params - The params object
   * @param {object} commentData - The comment data
   * @returns {object} - Returns an object
   * @memberof CommentService
   * */

  static async updateComment(user, params, commentData) {
    const { _id: userId } = user;
    const { commentId } = params;
    const { content } = commentData;
    const isValidObjectId = validateObjectId(commentId);
    if (!isValidObjectId)
      return {
        statusCode: 400,
        message: 'Invalid comment id',
      };
    const comment = await CommentModel.findOneAndUpdate(
      { _id: commentId, userId },
      { content },
      { new: true }
    );
    if (!comment)
      return {
        statusCode: 404,
        message: 'Comment not found',
      };
    return {
      statusCode: 200,
      message: 'Comment updated successfully',
      data: comment,
    };
  }

  /**
   * @description - This method is used to delete a comment
   * @param {object} user - The user data
   * @param {object} params - The params object
   * @returns {object} - Returns an object
   * @memberof CommentService
   *
   * */
  static async deleteComment(user, params) {
    const { _id: userId } = user;
    const { commentId } = params;
    const isValidObjectId = validateObjectId(commentId);
    if (!isValidObjectId)
      return {
        statusCode: 400,
        message: 'Invalid comment id',
      };
    const comment = await CommentModel.findOneAndDelete({
      _id: commentId,
      userId,
    });
    if (!comment)
      return {
        statusCode: 404,
        message: 'Comment not found',
      };
    return {
      statusCode: 200,
      message: 'Comment deleted successfully',
    };
  }
}

module.exports = CommentService;
