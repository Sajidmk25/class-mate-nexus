
const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = "https://kimtfyvvmrjadnvbsjow.supabase.co";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Auth middleware with admin check
const authenticateAdmin = async (req, res, next) => {
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
    
    // Check if user is an admin
    const { data: userProfile, error: profileError } = await supabase
      .from('profile')
      .select('role')
      .eq('id', user.id)
      .single();
      
    if (profileError || userProfile?.role !== 'admin') {
      return res.status(403).json({ error: 'Admin privileges required' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

// All routes require admin authentication
router.use(authenticateAdmin);

// GET all users
router.get('/users', async (req, res) => {
  try {
    // Get all profiles
    const { data: profiles, error: profilesError } = await supabase
      .from('profile')
      .select('id, full_name, role, student_id')
      .order('created_at', { ascending: false });
    
    if (profilesError) {
      console.error('Error fetching profiles:', profilesError);
      return res.status(500).json({ error: profilesError.message });
    }
    
    // Get emails for all users
    const { data: usersData, error: usersError } = await supabase.auth.admin
      .listUsers();
    
    if (usersError) {
      console.error('Error fetching users:', usersError);
      return res.status(500).json({ error: usersError.message });
    }
    
    // Combine profile and user data
    const users = profiles.map(profile => {
      const authUser = usersData.users.find(u => u.id === profile.id);
      return {
        id: profile.id,
        email: authUser?.email || '',
        name: profile.full_name,
        role: profile.role,
        student_id: profile.student_id
      }
    });
    
    return res.json(users);
  } catch (error) {
    console.error('Error in users function:', error);
    return res.status(500).json({ error: error.message });
  }
});

// POST create new user
router.post('/create-user', async (req, res) => {
  try {
    const { email, password, metadata } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    // Create the new user using service role key
    const { data: userData, error: createError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Automatically confirm the email
      user_metadata: metadata || {}
    });
    
    if (createError) {
      console.error('Error creating user:', createError);
      return res.status(400).json({ error: createError.message });
    }
    
    return res.json({ user: userData.user });
  } catch (error) {
    console.error('Error in create-user function:', error);
    return res.status(500).json({ error: error.message });
  }
});

// POST reset password
router.post('/reset-password', async (req, res) => {
  try {
    const { userId, newPassword } = req.body;
    
    if (!userId || !newPassword) {
      return res.status(400).json({ error: 'User ID and new password are required' });
    }
    
    // Update the user's password
    const { error: updateError } = await supabase.auth.admin.updateUserById(
      userId,
      { password: newPassword }
    );
    
    if (updateError) {
      console.error('Error resetting password:', updateError);
      return res.status(400).json({ error: updateError.message });
    }
    
    return res.json({ success: true });
  } catch (error) {
    console.error('Error in reset-password function:', error);
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
