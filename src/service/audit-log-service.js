const AuditLogModel = require('../model/audit-logs');

/**
 * @description - This is a class that contains methods for audit
 **/

class AuditLogService {
  /**
   * @description - This method is used to get all audit logs
   * @param {object} query - The query object
   * @returns {object} - Returns an object
   * @memberof AuditLogService
   * */
  static async getAllAuditLogs(query) {
    // NOTE - this endpoint should only be accessible by the admin but for now, we'll allow anyone to access it
    const { page, limit } = query;
    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 10,
      sort: { createdAt: -1 },
    };
    const auditLogs = await AuditLogModel.paginate({}, options);
    if (!auditLogs) {
      return {
        statusCode: 404,
        message: 'No audit logs found',
      };
    }
    return {
      statusCode: 200,
      message: 'Audit logs retrieved successfully',
      data: auditLogs,
    };
  }

  /**
   * @description - This method is used to create an audit log
   * @param {object} data - The data object
   * @returns {object} - Returns an object
   * @memberof AuditLogService
   * */
  static async createAuditLog(data) {
    const auditLog = await AuditLogModel.create(data);
    if (!auditLog) {
      return {
        statusCode: 500,
        message: 'Error creating audit log',
      };
    }
    return {
      statusCode: 201,
      message: 'Audit log created successfully',
      data: auditLog,
    };
  }
}

module.exports = AuditLogService;
