const CommunityService = require('../service/community-service');
const { successResponse, errorResponse } = require('../utils/response');

/**
 * @description - This is a class that contains methods for community.
 *
 *
 *
 */

class CommunityController {
  /**
   * @description - This method is used to create a community
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - Returns an object
   * @memberof CommunityController
   *  */
  static async createCommunity(req, res) {
    try {
      const { body, user } = req;
      console.log('body', body);
      console.log('user', user);
      const result = await CommunityService.createCommunity(body, user);
      console.log('got here 1');
      if (result.statusCode == 409)
        return errorResponse(res, result.statusCode, result.message);
      logger.info(
        `Community created successfully with name: ${JSON.stringify(result)}`
      );
      return successResponse(
        res,
        201,
        'Community created successfully',
        result
      );
    } catch (error) {
      console.log(error);
      logger.error(`Error in creating community: ${JSON.stringify(error)}`);
      return errorResponse(res, 500, 'Oops! Something went wrong');
    }
  }

  /**
   * @description - This method is used to update communities
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - Returns an object
   * @memberof CommunityController
   * */
  static async updateCommunity(req, res) {
    try {
      const { body, user } = req;
      const { id } = req.params;
      const result = await CommunityService.updateCommunity(body, id, user);

      if (result.statusCode == 404)
        return errorResponse(res, result.statusCode, result.message);
      logger.info(
        `Community updated successfully with id: ${JSON.stringify(result)}`
      );
      return successResponse(
        res,
        200,
        'Community updated successfully',
        result
      );
    } catch (error) {
      logger.error(`Error in updating community: ${JSON.stringify(error)}`);
      return errorResponse(res, 500, 'Oops! Something went wrong');
    }
  }

  /**
   * @description - This method is used to delete communities
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - Returns an object
   * @memberof CommunityController
   * */
  static async deleteCommunity(req, res) {
    try {
      const { id } = req.params;
      const result = await CommunityService.deleteCommunity(id, req.user);
      if (result.statusCode == 404)
        return errorResponse(res, result.statusCode, result.message);
      logger.info(
        `Community deleted successfully with id: ${JSON.stringify(result)}`
      );
      return successResponse(
        res,
        200,
        'Community deleted successfully',
        result
      );
    } catch (error) {
      logger.error(`Error in deleting community: ${JSON.stringify(error)}`);
      return errorResponse(res, 500, 'Oops! Something went wrong');
    }
  }
}

module.exports = CommunityController;
