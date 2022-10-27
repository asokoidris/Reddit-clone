const CommunityModel = require('../model/community');
const { successResponse, errorResponse } = require('../utils/response');
const HelperFunctions = require('../utils/helper-functions');

/**
 * @description - This is a class that contains methods for community.
 *
 *
 */

class CommunityService {
  /**
   * @description - This method is used to create a community
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - Returns an object
   * @memberof CommunityService
   *  */
  static async createCommunity(data, user) {
    const { name, username } = data;
    data.name = HelperFunctions.capitalizeFirstLetter(name);
    data.username = HelperFunctions.capitalizeFirstLetter(username);
    const community = await CommunityModel.findOne({ name });
    if (community)
      return {
        statusCode: 409,
        message: 'Community already exists with this ' + name,
      };

    const newCommunity = await CommunityModel.create({
      ...data,
      members: [user.id],
      moderators: [user.id],
      createdBy: user.id,
      createdAt: new Date(),
    });
    logger.info(`Community created with name: ${name}`);
    return {
      statusCode: 201,
      message: 'Community created successfully',
      data: newCommunity,
    };
  }

  /**
   * @description - This method is used to update communities
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - Returns an object
   * @memberof CommunityService
   * */
  static async updateCommunity(data, id) {
    const community = await CommunityModel.findById(id);

    if (!community)
      return {
        statusCode: 404,
        message: 'Community not found',
      };
    data.name = HelperFunctions.capitalizeFirstLetter(data.name);
    data.username = HelperFunctions.capitalizeFirstLetter(data.username);

    if (data.name !== community.name) {
      const communityName = await CommunityModel.findOne({ name: data.name });
      if (communityName)
        return {
          statusCode: 409,
          message: 'Community already exists with this name',
        };
    }

    const updatedCommunity = await CommunityModel.findByIdAndUpdate(
      { _id: id },
      {
        ...data,
      },
      { new: true }
    );
    logger.info(`Community updated with id: ${id}`);
    return {
      statusCode: 200,
      message: 'Community updated successfully',
      data: updatedCommunity,
    };
  }

  /**
   * @description - This method is used to delete communities
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - Returns an object
   * @memberof CommunityService
   * */
  static async deleteCommunity(data) {
    const { id } = data;
    const community = await CommunityModel.findById(id);
    if (!community)
      return {
        statusCode: 404,
        message: 'Community not found',
      };
    await CommunityModel.findByIdAndDelete(id);
    logger.info(`Community deleted with id: ${id}`);
    return {
      statusCode: 200,
      message: 'Community deleted successfully',
    };
  }
}

module.exports = CommunityService;
