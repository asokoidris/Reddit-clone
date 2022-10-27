const { successResponse, errorResponse } = require('../utils/response');
const AuditLogService = require('../service/audit-log-service');

/**
 * @description - This is a class that contains methods for audit
 **/

class AuditLogController {
  /**
   * @description - This method is used to get all audit logs
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - Returns an object
   * @memberof AuditLogController
   * */
  static async getAllAuditLogs(req, res) {
    try {
      const { query } = req;
      const auditLogs = await AuditLogService.getAllAuditLogs(query);
      if (auditLogs.statusCode === 404) {
        return errorResponse(res, auditLogs.statusCode, auditLogs.message);
      }
      return successResponse(
        res,
        auditLogs.statusCode,
        auditLogs.message,
        auditLogs
      );
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }
}

module.exports = AuditLogController;
