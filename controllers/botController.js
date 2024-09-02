const supabase = require('../config/database');
const TelegramService = require('../telegramService');
const { getBotsByUserId, getBotByUserId, updateBot, deleteBot } = require('../models/botModel');
const { getTelegramBotInfo } = require('../utils/helper');

const createBot = async (req, res) => {
  const { botToken } = req.body;
  const userId = req.user.user.id;

  // Dynamically generate the webhook URL
  const webhookUrl = `${process.env.BASE_URL}/api/webhook/${botToken}`;

  try {
    const telegramService = new TelegramService(botToken);

    // Set the Telegram webhook
    await telegramService.setWebhook(webhookUrl);
    const telegramInfo = await getTelegramBotInfo(botToken);
    console.log(telegramInfo);
    const {username, first_name } = telegramInfo
    // Save bot info in Supabase
    const { data, error } = await supabase.from('bots').insert([{ name: first_name, username, user_id: userId, bot_token: botToken, webhook_url: webhookUrl, integration_link: 'https://ai-bot-chi.vercel.app/api/nlp/query/', tg_data: telegramInfo }]);

    if (error) return res.status(400).json({ error: error.message });

    res.status(201).json({ message: 'Bot created and webhook set successfully', bot: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get all bots for a user
const getBots = async (req, res) => {
  const userId = req.user.user.id;

  try {
    const bots = await getBotsByUserId(userId);
    res.status(200).json({ bots });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get single bot for a user
const getBot = async (req, res) => {
  const userId = req.user.user.id;
  const { botId } = req.params
  try {
    const bots = await getBotByUserId(userId, botId);
    res.status(200).json({ bots });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a bot
const update_Bot = async (req, res) => {
  const { botId } = req.params;
  const botData = req.body;

  try {
    const bot = await updateBot(botId, botData);
    res.status(200).json({ message: 'Bot updated successfully', bot });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a bot
const delete_Bot = async (req, res) => {
  const { botId } = req.params;

  try {
    await deleteBot(botId);
    res.status(200).json({ message: 'Bot deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = { createBot, getBots, getBot, update_Bot, delete_Bot };
