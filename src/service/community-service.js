const CommunityModel = require('../model/community');
const HelperFunctions = require('../utils/helper-functions');
const AuditLogService = require('../service/audit-log-service');

/**
 * @description - This is a class that contains methods for community.
 *
 *
 */

class CommunityService {
  /**
   * @description - This method is used to create a community
   * @param {object} data - The request object
   * @param {object} user - The response object
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

    AuditLogService.createAuditLog({
      action: 'create',
      resource: 'community',
      modelId: newCommunity.id,
      userId: user.id,
    });
    return {
      statusCode: 201,
      message: 'Community created successfully',
      data: newCommunity,
    };
  }

  /**
   * @description - This method is used to update communities
   * @param {object} data - The data object
   * @param {string} id - The id of the community
   * @param {object} user - The user object
   * @returns {object} - Returns an object
   * @memberof CommunityService
   * */
  static async updateCommunity(data, id, user) {
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

    AuditLogService.createAuditLog({
      action: 'update',
      resource: 'community',
      modelId: id,
      userId: user.id,
    });

    return {
      statusCode: 200,
      message: 'Community updated successfully',
      data: updatedCommunity,
    };
  }

  /**
   * @description - This method is used to delete communities
   * @param {object} data - The data object
   * @param {object} user - The user object
   * @returns {object} - Returns an object
   * @memberof CommunityService
   * */
  static async deleteCommunity(data, user) {
    const { id } = data;
    const community = await CommunityModel.findById(id);
    if (!community)
      return {
        statusCode: 404,
        message: 'Community not found',
      };
    await CommunityModel.findByIdAndDelete(id);
    logger.info(`Community deleted with id: ${id}`);

    AuditLogService.createAuditLog({
      action: 'delete',
      resource: 'community',
      modelId: id,
      userId: user.id,
    });
    return {
      statusCode: 200,
      message: 'Community deleted successfully',
    };
  }
}

module.exports = CommunityService;
