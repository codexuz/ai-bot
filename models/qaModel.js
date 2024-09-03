// server/models/qaModel.js

const supabase = require('../config/database');

// Create a new question-answer pair
const createQA = async (botId, contextText, file) => {
  const { data, error } = await supabase
    .from('bots')
    .update({contextText: contextText, file: file})
    .eq('id', botId)
  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Get all Q&A for a bot
const getQAByBotId = async (botId) => {
  const { data, error } = await supabase
    .from('bots')
    .select('contextText')
    .eq('id', botId)
    .single()

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Update a question-answer pair
const updateQA = async (botId, contextText) => {
  const { data, error } = await supabase
    .from('bots')
    .update({contextText: contextText})
    .eq('id', botId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Delete a question-answer pair
const deleteQA = async (botId) => {
  const { data, error } = await supabase
    .from('bots')
    .update({contextText: ''})
    .eq('id', botId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

module.exports = { createQA, getQAByBotId, updateQA, deleteQA };
