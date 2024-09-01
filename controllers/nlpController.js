// server/controllers/nlpController.js

const { getLangChainResponse } = require('../nlp/nlpService');


// Handle a query for a bot
exports.handleBotQuery = async (req, res) => {
  const { botId } = req.params;
  const { question } = req.body;

  try {
    const answer = await getLangChainResponse(botId, question);
    res.status(200).json({ answer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
