const supabase = require('../config/database');
const TelegramService = require('../telegramService');
const { registerTelegamUserId } = require('../utils/helper');

const handleWebhook = async (req, res) => {
  const { botToken } = req.params;
  const { message } = req.body;
  const chatId = message.chat.id;
  const text = message.text;
  console.log(botToken)
  try {
    // Fetch bot details using the botId
    await registerTelegamUserId(chatId);
    const { data: bots, error } = await supabase.from('bots')
    .select('*')
    .eq('bot_token', botToken)
    .single()

    if (error || bots.length === 0) {
      return res.status(404).json({ error: 'Bot not found' });
    }

    console.log(bots)
    const telegramService = new TelegramService(bots.bot_token);
    console.log(telegramService)
    // Handle different commands or text inputs
    if (text === '/start') {
      await telegramService.sendMessage(chatId, "Assalomu alaykum! Botimizga xush kelibsiz! Kompaniyamiz bo'yicha sizni qiziqtirgan savollarga javob berishim mumkin?");
    }

    if (text === '/help') {
      await telegramService.sendMessage(chatId, "Siz yordam buyrug'ini bosdingiz. Sizga qanday yordam bera olaman.");
    }

    res.status(200).send('OK');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { handleWebhook };
