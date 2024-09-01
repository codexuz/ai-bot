const express = require('express');
const { handleWebhook } = require('../controllers/webhookController');
const router = express.Router();

// Webhook endpoint, dynamically matched by botToken
router.post('/:botToken', handleWebhook);

module.exports = router;
