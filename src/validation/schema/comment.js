const joi = require('joi');

const createCommentSchema = joi
  .object({
    postId: joi.string(),
    body: joi.string().required(),
    commentId: joi.string(),
  })
  .or('postId', 'commentId');

const getAllCommentsSchema = joi.object({
  body: joi.string(),
  postedBy: joi.string(),
  votes: joi.number(),
  hideVotes: joi.boolean(),
  replies: joi.array().items(joi.string()),
});

const getCommentByIdSchema = joi.object({
  id: joi.string().required(),
});

const updateCommentSchema = joi.object({
  body: joi.string(),
  postedBy: joi.string(),
  votes: joi.number(),
  hideVotes: joi.boolean(),
});

const deleteCommentSchema = joi.object({
  id: joi.string().required(),
});

module.exports = {
  createCommentSchema,
  getAllCommentsSchema,
  getCommentByIdSchema,
  updateCommentSchema,
  deleteCommentSchema,
};
