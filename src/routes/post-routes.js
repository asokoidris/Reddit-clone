const express = require('express');
const router = express.Router();
const { validate } = require('../validation/validatorClass');
const {
  createPostSchema,
  updatePostSchema,
  deletePostSchema,
} = require('../validation/schema/post');
const PostControllers = require('../controller/post-controller');
const { isUserAuthenticated } = require('../middleware/authentication');

router.post(
  '/',
  isUserAuthenticated,
  validate(createPostSchema),
  PostControllers.createPost
);

router.get('/all', isUserAuthenticated, PostControllers.getAllPosts);

router.get('/:id', isUserAuthenticated, PostControllers.getPostById);

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
