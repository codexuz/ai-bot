// server/controllers/qaController.js

const { createQA, getQAByBotId, updateQA, deleteQA } = require('../models/qaModel');

// Create a new question-answer pair
exports.createQA = async (req, res) => {
  const { botId } = req.params
  const { contextText, file } = req.body;
  console.log(botId)
  try {
    const qa = await createQA(botId, contextText, file);
    res.status(201).json({ message: 'Q&A created successfully', qa });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Q&A for a bot
exports.getQA = async (req, res) => {
  const { botId } = req.params;

  try {
    const qa = await getQAByBotId(botId);
    res.status(200).json({ qa });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a question-answer pair
exports.updateQA = async (req, res) => {
  const { botId } = req.params;
  const contextText = req.body;

  try {
    const qa = await updateQA(botId, contextText);
    res.status(200).json({ message: 'Q&A updated successfully', qa });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a question-answer pair
exports.deleteQA = async (req, res) => {
  const { botId } = req.params;

  try {
    await deleteQA(botId);
    res.status(200).json({ message: 'Q&A deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
