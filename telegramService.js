const axios = require('axios')

class TelegramService {
  constructor(token) {
    this.token = token;
    this.apiUrl = `${process.env.TELEGRAM_API_URL}/bot${token}`;
  }

  async setWebhook(url) {
    return axios.post(`${this.apiUrl}/setWebhook`, { url });
  }

  async sendMessage(chatId, text) {
    return axios.post(`${this.apiUrl}/sendMessage`, { chat_id: chatId, text });
  }

  async setCommands(commands) {
    return axios.post(`${this.apiUrl}/setMyCommands`, { commands });
  }

  async deleteCommands() {
    return axios.post(`${this.apiUrl}/deleteMyCommands`);
  }

  // Additional methods to handle bot commands dynamically
}

module.exports = TelegramService;
