const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const auditLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
    },
    resource: {
      type: String,
      required: true,
    },
    modelId: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

auditLogSchema.plugin(mongoosePaginate);
const AuditLog = mongoose.model('AuditLog', auditLogSchema);

module.exports = AuditLog;
