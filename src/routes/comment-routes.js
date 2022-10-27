const express = require('express');
const router = express.Router();
const { validate } = require('../validation/validatorClass');
const {
  createCommentSchema,
  getAllCommentsSchema,
  getCommentByIdSchema,
  updateCommentSchema,
  deleteCommentSchema,
} = require('../validation/schema/comment');
const { isUserAuthenticated } = require('../middleware/authentication');
const CommentController = require('../controller/comment-controller');

router.post(
  '/',
  isUserAuthenticated,
  validate(createCommentSchema),
  CommentController.createComment
);

router.get(
  '/',
  isUserAuthenticated,
  validate(getAllCommentsSchema),
  CommentController.getAllComments
);

router.get(
  '/:id',
  isUserAuthenticated,
  validate(getCommentByIdSchema),
  CommentController.getCommentById
);

router.patch(
  '/:id',
  isUserAuthenticated,
  validate(updateCommentSchema),
  CommentController.updateComment
);

router.delete(
  '/:id',
  isUserAuthenticated,
  validate(deleteCommentSchema),
  CommentController.deleteComment
);

module.exports = router;
