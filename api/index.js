// server/index.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('../routes/authRoutes');
const botRoutes = require('../routes/botRoutes');
const qaRoutes = require('../routes/qaRoutes');
const nlpRoutes = require('../routes/nlpRoutes');
const webhookRoutes = require('../routes/webhookRoutes');
const fileRoutes = require('../routes/fileRoutes')
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/bot', botRoutes);
app.use('/api/qa', qaRoutes);
app.use('/api/nlp', nlpRoutes);
app.use('/api/webhook', webhookRoutes);
app.use('/api/file', fileRoutes)


// Start server
app.listen( 5000, () => console.log("Server ready on port 5000."));


module.exports = app;
