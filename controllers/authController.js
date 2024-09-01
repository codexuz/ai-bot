// server/controllers/authController.js

const supabase = require('../config/database');

// Register a new user
exports.register = async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: 'User registered successfully', data });
};

// Login an existing user
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: 'User logged in successfully', data });
};
