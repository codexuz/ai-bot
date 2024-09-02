const supabase = require('../config/database');
const axios = require('axios');

const registerTelegamUserId = async (chatId) => {
   // Save bot info in Supabase
   const { data, error } = await supabase.from('telegram_users').upsert([{user_id: chatId}]);

   if (error) throw new Error(error.message);

   return data;
}


async function getTelegramBotInfo(botToken) {
  try {
    const response = await axios.get(`https://api.telegram.org/bot${botToken}/getMe`);
    return response.data.result; // This will return the bot information
  } catch (error) {
    throw new Error(`Failed to fetch Telegram bot info: ${error.message}`);
  }
}

module.exports = {registerTelegamUserId, getTelegramBotInfo}

