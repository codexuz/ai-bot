// server/routes/botRoutes.js

const express = require('express');
const router = express.Router();
const { createBot, getBots, getBot, update_Bot, delete_Bot } = require('../controllers/botController');
const authMiddleware = require('../middleware/auth');

// Apply authentication middleware
router.post('/create', authMiddleware, createBot);
router.get('/', authMiddleware, getBots);
router.get('/:botId', authMiddleware, getBot);
router.put('/:botId', authMiddleware, update_Bot);
router.delete('/:botId', authMiddleware, delete_Bot);

module.exports = router;
