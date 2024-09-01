const { uploadFile } = require('../models/filesModel')


exports.fileUpload= async (req, res) => {
    try {
        const { botId } = req.params
        
        const file = req.file;

        if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
        }

        const result = await uploadFile(file, botId);

        return res.status(200).json({
            success: true,
            message: 'File uploaded and bot updated successfully',
            data: result
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

