const express = require('express');
const router = express.Router();
const { validate } = require('../validation/validatorClass');
const {
  createCommunitySchema,
  updateCommunitySchema,
  deleteCommunitySchema,
} = require('../validation/schema/community');
const { isUserAuthenticated } = require('../middleware/authentication');

const CommunityController = require('../controller/community-controller');

router.post(
  '/',
  isUserAuthenticated,
  validate(createCommunitySchema),
  CommunityController.createCommunity
);
router.patch(
  '/:id',
  isUserAuthenticated,
  validate(updateCommunitySchema),
  CommunityController.updateCommunity
);
router.delete(
  '/:id',
  isUserAuthenticated,
  validate(deleteCommunitySchema),
  CommunityController.deleteCommunity
);

module.exports = router;
