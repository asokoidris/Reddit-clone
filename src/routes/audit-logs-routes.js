const express = require('express');
const router = express.Router();
const AuditLogController = require('../controller/audit-log-controller');

router.get('/', AuditLogController.getAllAuditLogs);

module.exports = router;
