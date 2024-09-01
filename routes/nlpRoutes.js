// server/routes/nlpRoutes.js

const express = require('express');
const router = express.Router();
const { handleBotQuery } = require('../controllers/nlpController');

// Apply authentication middleware
router.post('/query/:botId', handleBotQuery);

module.exports = router;
