const mongoose = require('mongoose');

const ruleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    communityUsername: {
      type: String,
    },
    date: {
      type: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Rule = mongoose.model('Rule', ruleSchema);

module.exports = Rule;
