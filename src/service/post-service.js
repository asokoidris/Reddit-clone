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
   * @param {object} user - The response object
   * @returns {object} - Returns an object
   * @memberof PostService
   */
  static async createPost(data, user) {
    const { title } = data;
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
   * @description - This method is used to get a post by id
   * @param {string} id - The id of the post
   * @param {object} user - The user object
   * @returns {object} - Returns an object
   * @memberof PostService
   * */
  static async getPostById(id, user) {
    const post = await PostModel.findById(id)
      .populate('postedBy')
      .populate('postedTo')
      .populate('comments');

    if (!post || (post.drafted && post.postedBy._id.toString() !== user.id))
      return {
        statusCode: 404,
        message: 'Post not found',
      };

    if (
      post.postedTo.privacy === 'private' &&
      !post.postedTo.members.includes(user.id)
    ) {
      const isMember = post.postedTo.members.includes(user.id);
      if (!isMember)
        return {
          statusCode: 403,
          message: 'You are not a member of this community',
        };
    }

    return {
      statusCode: 200,
      message: 'Post fetched successfully',
      data: post,
    };
  }

  /**
   * @description - This method is used to get all posts
   * @param {object} user - The user object
   * @Params {page: number, limit: number } pagination - The pagination object
   * @returns {object} - Returns an object
   * @memberof PostService
   * */
  static async getAllPosts(user, queryData) {
    // use mongoose.paginate to get all posts
    // only drafted post and where the user is a member of the community
    // and remove post where the community is private and the user is not a member

    const query = {
      page: Number(queryData.page) || 1,
      limit: Number(queryData.limit) || 10,
    };

    const posts = await PostModel.paginate(
      {
        drafted: false,
      },
      {
        page: query.page,
        limit: query.limit,
        sort: { createdAt: -1 },
        populate: [
          {
            path: 'postedBy',
          },
          {
            path: 'postedTo',
          },
        ],
      }
    )
      // remove post where the community is private and the user is not a member
      .then((posts) => {
        // remove from posts.docs array where the community is private and the user is not a member
        posts.docs = posts.docs.filter((post) => {
          if (
            post.postedTo.privacy === 'private' &&
            !post.postedTo.members.includes(user.id)
          ) {
            return false;
          }
          return true;
        });

        posts.totalDocs = posts.docs.length;
        posts.totalPages = Math.ceil(posts.totalDocs / posts.limit);

        return posts;
      });

    return {
      statusCode: 200,
      message: 'Posts fetched successfully',
      data: posts,
    };
  }

  /**
   * @description - This method is used to update a post
   * @param {object} data - The request object
   * @param {object} id - The id of the post
   * @param {object} user - The response object
   * @returns {object} - Returns an object
   * @memberof PostService
   * */
  static async updatePost(data, id, user) {
    const post = await PostModel.findById(id);
    if (!post)
      return {
        statusCode: 404,
        message: 'Post not found',
      };
    // check if the user is the owner of the post
    if (post.postedBy.toString() !== user.id)
      return {
        statusCode: 403,
        message: 'You are not the owner of this post',
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
