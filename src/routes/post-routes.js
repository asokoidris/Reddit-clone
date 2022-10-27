const express = require('express');
const router = express.Router();
const { validate } = require('../validation/validatorClass');
const {
  createPostSchema,
  getPostByIdSchema,
  updatePostSchema,
  deletePostSchema,
} = require('../validation/schema/post');
const PostControllers = require('../controller/post-controller');
const { isUserAuthenticated } = require('../middleware/authentication');
const { get } = require('mongoose');

router.post(
  '/',
  isUserAuthenticated,
  validate(createPostSchema),
  PostControllers.createPost
);

router.get('/:id', validate(getPostByIdSchema), PostControllers.getPostById);

router.patch(
  '/:id',
  isUserAuthenticated,
  validate(updatePostSchema),
  PostControllers.updatePost
);

router.delete(
  '/:id',
  isUserAuthenticated,
  validate(deletePostSchema),
  PostControllers.deletePost
);

module.exports = router;
