const path = require('path');
const supabase = require('../config/database');

const uploadFile = async (file, botId) => {
    try {
        const filePath = path.join('uploads', file.filename);
        const fileFullPath = process.env.BASE_URL + '/'+filePath
       
        const { data, error } = await supabase
        .from('bots')
        .update({ contextText: fileFullPath })
        .eq('id', botId);

        if (error) {
            throw new Error(`Database update failed: ${error.message}`);
        }

       
       return fileFullPath




    } catch (error) {
        throw new Error(`File upload failed: ${error.message}`);
    }
};

module.exports = { uploadFile };
