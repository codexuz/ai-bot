const supabase = require('./config/database');
const TelegramService = require('./telegramService');

class BotService {
  async createBot(userId, botToken, webhookUrl) {
    const telegramService = new TelegramService(botToken);

    // Set Telegram webhook
    await telegramService.setWebhook(webhookUrl);

    // Save bot info in Supabase
    const { data, error } = await supabase.from('bots').insert([{ user_id: userId, bot_token: botToken, webhook_url: webhookUrl }]);

    if (error) throw new Error(error.message);

    return data[0];
  }

  // Additional methods like getBot, updateBot, deleteBot, etc.
}

module.exports = new BotService();
