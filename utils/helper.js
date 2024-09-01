const supabase = require('../config/database');


const registerTelegamUserId = async (chatId) => {
   // Save bot info in Supabase
   const { data, error } = await supabase.from('telegram_users').upsert([{user_id: chatId}]);

   if (error) throw new Error(error.message);

   return data;
}

module.exports = {registerTelegamUserId}