const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    cover: {
      type: String,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    pendingMembers: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        message: {
          type: String,
          default: 'This user has requested to join this community.',
        },
      },
    ],
    membersCount: {
      type: Number,
      default: 1,
    },
    moderators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    invitedModerators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    posts: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Posts',
    },
    postsCount: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    createdAt: {
      type: String,
      default: new Date().toISOString(),
    },
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],
    rules: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rule',
      },
    ],
    privacy: {
      type: String,
      enum: ['public', 'private'],
      default: 'public',
    },
    banned: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        note: {
          type: String,
          default: 'This user has been banned from this community.',
        },
        until: {
          type: String,
        },
        permanent: {
          type: Boolean,
        },
        reason: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Rule',
        },
        message: {
          type: String,
        },
      },
    ],
    flairs: [
      {
        id: {
          type: String,
        },
        text: {
          type: String,
        },
        backgroundColor: {
          type: String,
        },
        textColor: {
          type: String,
        },
        CSSClass: {
          type: String,
        },
        ModOnly: {
          type: Boolean,
        },
        type: { type: String },
      },
    ],
    theme: {
      type: { main: String, highlight: String },
      default: { main: '#0079D3', highlight: '#0079D3' },
    },
  },
  { timestamps: true }
);

const Community = mongoose.model('Community', communitySchema);

module.exports = Community;
