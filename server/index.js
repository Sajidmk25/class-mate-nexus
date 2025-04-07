
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize Supabase client
const supabaseUrl = "https://kimtfyvvmrjadnvbsjow.supabase.co";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Auth middleware
const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const token = authHeader.replace('Bearer ', '');
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

// Routes
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Node.js Express API!' });
});

// Protected route example
app.get('/api/user', authenticateUser, (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.user_metadata?.name || 'User',
    role: req.user.user_metadata?.role || 'student',
    email: req.user.email
  });
});

// Import route modules
const contactsRouter = require('./routes/contacts');
const adminRouter = require('./routes/admin');

// Use route modules
app.use('/api/contacts', contactsRouter);
app.use('/admin', adminRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
