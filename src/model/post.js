const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const postSchema = new mongoose.Schema(
  {
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
      },
    ],
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    url: {
      type: String,
    },
    urlData: {
      type: String,
    },
    postedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Community',
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    votes: {
      type: Number,
      default: 0,
    },
    hideVotes: {
      type: Boolean,
      default: false,
    },
    drafted: {
      type: Boolean,
      default: false,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  { timestamps: true }
);

postSchema.plugin(mongoosePaginate);
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
