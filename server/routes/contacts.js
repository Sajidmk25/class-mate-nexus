
const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

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

// All routes require authentication
router.use(authenticateUser);

// GET contacts
router.get('/', async (req, res) => {
  try {
    // Get the user's role
    const { data: profileData } = await supabase
      .from('profile')
      .select('role')
      .eq('id', req.user.id)
      .single();

    const isTeacher = profileData?.role === 'teacher' || profileData?.role === 'admin';
    
    let query = supabase.from('student_contacts').select(`
      *,
      profile:student_id(full_name, student_id)
    `);

    // Filter based on role
    if (!isTeacher) {
      // For students - show contacts where they're the recipient or the sender
      query = query.eq('student_id', req.user.id);
    }
    
    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching contacts:', error);
      return res.status(500).json({ error: 'Failed to fetch contact messages' });
    }

    return res.json({ success: true, data });
  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// POST new contact
router.post('/', async (req, res) => {
  try {
    // Get the user's role
    const { data: profileData } = await supabase
      .from('profile')
      .select('role')
      .eq('id', req.user.id)
      .single();

    const isTeacher = profileData?.role === 'teacher' || profileData?.role === 'admin';
    
    if (isTeacher) {
      // Teacher creating a contact to student
      const { student_id, subject, message } = req.body;
      
      if (!student_id || !subject || !message) {
        return res.status(400).json({ error: 'Student ID, subject, and message are required' });
      }
      
      // Insert the contact message
      const { data, error } = await supabase
        .from('student_contacts')
        .insert({
          student_id,
          teacher_id: req.user.id,
          subject,
          message,
          status: 'unread' // Mark as unread for student
        });

      if (error) {
        console.error('Error inserting contact:', error);
        return res.status(500).json({ error: 'Failed to save contact message' });
      }

      return res.json({ success: true, data });
    } else {
      // Student creating a contact
      const { subject, message } = req.body;
      
      if (!subject || !message) {
        return res.status(400).json({ error: 'Subject and message are required' });
      }

      // Insert the contact message
      const { data, error } = await supabase
        .from('student_contacts')
        .insert({
          student_id: req.user.id,
          subject,
          message
        });

      if (error) {
        console.error('Error inserting contact:', error);
        return res.status(500).json({ error: 'Failed to save contact message' });
      }

      return res.json({ success: true, data });
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT update contact
router.put('/', async (req, res) => {
  try {
    const { id, status, notes } = req.body;
    
    if (!id) {
      return res.status(400).json({ error: 'Contact ID is required' });
    }

    // Get the user's role
    const { data: profileData } = await supabase
      .from('profile')
      .select('role')
      .eq('id', req.user.id)
      .single();

    const isTeacher = profileData?.role === 'teacher' || profileData?.role === 'admin';
    
    if (!isTeacher) {
      return res.status(403).json({ error: 'Only teachers can update contacts' });
    }

    // Update the contact
    const { data, error } = await supabase
      .from('student_contacts')
      .update({ 
        status: status || undefined, 
        notes: notes || undefined,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating contact:', error);
      return res.status(500).json({ error: 'Failed to update contact message' });
    }

    return res.json({ success: true, data });
  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
