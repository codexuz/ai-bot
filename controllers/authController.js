const supabase = require('../config/database');

// Register a new user
exports.register = async (req, res) => {
  const { email, password, full_name } = req.body;
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name,
        avatar_url: 'https://bkxhwaeluswfwfxavmpt.supabase.co/storage/v1/object/public/avatars/avatar.jpg'
      }
    }
  });

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

// Google OAuth Login/Signup
exports.googleAuth = async (req, res) => {
  const { credential } = req.body;
  console.log(credential)

  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: 'google',
    token: credential,
    nonce: '<NONCE>',
  })
    

  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: 'Redirecting to Google for authentication', data });
};
