const { successResponse, errorResponse } = require('../utils/response');
const UserModel = require('../model/user');
const { decodeToken } = require('../utils/token');

async function isUserAuthenticated(req, res, next) {
  const { authorization } = req.headers;
  console.log(authorization);

  if (!authorization) {
    return errorResponse(res, 499, 'Token required');
  }

  const token = await decodeToken(authorization);

  if (!token) {
    return errorResponse(res, 498, 'Invalid token');
  }

  const user = await UserModel.findById(token.payload.subject);

  if (!user) {
    return errorResponse(res, 401, 'Invalid user token');
  }

  req.user = user;
  return next();
}

module.exports = {
  isUserAuthenticated,
};
