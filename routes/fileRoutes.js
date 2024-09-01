// routes/uploadRoutes.js
const express = require('express');
const multer = require('multer');
const { fileUpload } = require('../controllers/fileController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files to the 'uploads' directory
  },
  filename: (req, file, cb) => {
    // Keep the original file name
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });


// Define the upload route
router.post('/:botId/upload', upload.single('file'), authMiddleware, fileUpload);

module.exports = router;
