// server/models/usersModel.js

const supabase = require('../config/database');

async function saveUser(message) {
    const { data, error } = await supabase
        .from('users')
        .insert([
            {
                telegram_id: message.chat.id,
                username: message.chat.username,
                first_name: message.chat.first_name,
                last_name: message.chat.last_name,
                type: message.chat.type
            }
        ]);

    if (error) {
        console.error('Error inserting user:', error);
        return null;
    }

    return data;
}


module.exports = { saveUser};
