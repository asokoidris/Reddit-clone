const os = require('os');
const PostModel = require('../model/post');
const CommunityModel = require('../model/community');
const HelperFunctions = require('../utils/helper-functions');

/**
 * @description - This is a class that contain business logic for post.
 *  @class Controller
 * @exports Controller
 * @classdesc - This is a class that contains business logic for post.
 */

class PostService {
  /**
   * @description - This method is used to create a post
   * @param {object} data - The request object
   * @returns {object} - Returns an object
   * @memberof PostService
   */
  static async createPost(data, user) {
    const { title, categories } = data;
    const post = await PostModel.findOne({
      title: HelperFunctions.capitalizeFirstLetter(title),
    });
    if (post)
      return {
        statusCode: 409,
        message: 'Post with same title already exists',
      };

    data.postedTo = HelperFunctions.capitalizeFirstLetter(data.postedTo);

    const community = await CommunityModel.findOne({
      $or: [{ _id: data.postedTo }, { username: data.postedTo }],
    });

    if (!community)
      return {
        statusCode: 404,
        message: 'Community not found',
      };

    const isMember = community.members.includes(user.id);
    if (!isMember)
      return {
        statusCode: 403,
        message: 'You are not a member of this community',
      };
    const newPost = await PostModel.create({
      ...data,
      postedBy: user.id,
      category: data.categories,
    });

    logger.info(`Post created with title: ${title}`);

    await CommunityModel.findByIdAndUpdate(community._id, {
      $inc: { postsCount: 1 },
    });

    // update the urlData in the post
    let urlData = '';
    if (process.env.NODE_ENV === 'development') {
      urlData = `http://localhost:${process.env.PORT}/post/${newPost._id}`;
    } else {
      urlData = `https://www.${process.env.DOMAIN_NAME}/post/${newPost._id}`;
    }
    const updatedPost = await PostModel.findByIdAndUpdate(
      { _id: newPost.id },
      { urlData },
      { new: true }
    );

    return {
      statusCode: 201,
      message: 'Post created successfully',
      data: updatedPost,
    };
  }

  /**
   *  @description - This method is used to get a post
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - Returns an object
   * @memberof PostService
   * */
  static async getPostById(id) {
    // check if post is public or private
    const post = await PostModel.findById(id);
    if (!post)
      return {
        statusCode: 404,
        message: 'Post not found',
      };
    return {
      statusCode: 200,
      message: 'Post found',
      data: post,
    };
  }

  /**
   * @description - This method is used to update a post
   * @param {object} req - The request object
   *  @param {object} res - The response object
   * @returns {object} - Returns an object
   * @memberof PostService
   * */
  static async updatePost(data, id) {
    const post = await PostModel.findById(id);
    if (!post)
      return {
        statusCode: 404,
        message: 'Post not found',
      };
    const updatedPost = await PostModel.findByIdAndUpdate(
      { _id: id },
      { ...data },
      { new: true }
    );
    return {
      statusCode: 200,
      message: 'Post updated successfully',
      data: updatedPost,
    };
  }

  /**
   * @description - This method is used to delete a post
   *  @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - Returns an object
   * @memberof PostService
   * */
  static async deletePost(id) {
    const post = await PostModel.findById(id);
    if (!post)
      return {
        statusCode: 404,
        message: 'Post not found',
      };
    await PostModel.findByIdAndDelete(id);
    return {
      statusCode: 200,
      message: 'Post deleted successfully',
    };
  }
}

module.exports = PostService;
