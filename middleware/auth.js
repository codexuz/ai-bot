// server/middleware/auth.js

const supabase = require('../config/database');

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  req.user = data;
  next();
};

module.exports = authMiddleware;
