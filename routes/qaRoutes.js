// server/routes/qaRoutes.js

const express = require('express');
const router = express.Router();
const { createQA, getQA, updateQA, deleteQA } = require('../controllers/qaController');
const authMiddleware = require('../middleware/auth');

// Apply authentication middleware
router.post('/:botId/create', authMiddleware, createQA);
router.get('/:botId', authMiddleware, getQA);
router.put('/:botId', authMiddleware, updateQA);
router.delete('/:botId', authMiddleware, deleteQA);

module.exports = router;
