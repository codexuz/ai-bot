// server/models/botModel.js

const supabase = require('../config/database');

// Create a new bot
const createBot = async (userId, botName, description, botToken) => {
  if(!botName || !description){
    return "All fields are mandatory"
  }

  const { data, error } = await supabase
    .from('bots')
    .insert([{ user_id: userId, name: botName, description, token: botToken }]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Retrieve all bots for a user
const getBotsByUserId = async (userId) => {
  const { data, error } = await supabase
    .from('bots')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};



// Retrieve single bot for a user
const getBotByUserId = async (userId, botId) => {
  const { data, error } = await supabase
    .from('bots')
    .select('*')
    .eq('user_id', userId)
    .eq("id", botId)
    .single()

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Update a bot
const updateBot = async (botId, botData) => {
  const { data, error } = await supabase
    .from('bots')
    .update(botData)
    .eq('id', botId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Delete a bot
const deleteBot = async (botId) => {
  
  const { data, error } = await supabase
    .from('bots')
    .delete()
    .eq('id', botId)

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

module.exports = { createBot, getBotsByUserId, getBotByUserId, updateBot, deleteBot };
