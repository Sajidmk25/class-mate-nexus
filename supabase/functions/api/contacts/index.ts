
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.2'
import { corsHeaders } from '../_shared/cors.ts'
import { getAuthUser } from '../_shared/auth.ts'

const supabaseUrl = Deno.env.get('SUPABASE_URL') as string
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string

Deno.serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    
    // Get the authenticated user
    const user = await getAuthUser(req, supabase)
    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (req.method === 'POST') {
      // Process the request body
      const { subject, message } = await req.json()
      
      if (!subject || !message) {
        return new Response(
          JSON.stringify({ error: 'Subject and message are required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // Insert the contact message
      const { data, error } = await supabase
        .from('student_contacts')
        .insert({
          student_id: user.id,
          subject,
          message
        })

      if (error) {
        console.error('Error inserting contact:', error)
        return new Response(
          JSON.stringify({ error: 'Failed to save contact message' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      return new Response(
        JSON.stringify({ success: true, data }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    } 
    else if (req.method === 'GET') {
      // Get the user's role
      const { data: profileData } = await supabase
        .from('profile')
        .select('role')
        .eq('id', user.id)
        .single()

      const isTeacher = profileData?.role === 'teacher' || profileData?.role === 'admin'
      
      let query = supabase.from('student_contacts').select(`
        *,
        profile:student_id(full_name, student_id)
      `)

      // Filter based on role
      if (!isTeacher) {
        query = query.eq('student_id', user.id)
      }
      
      query = query.order('created_at', { ascending: false })

      const { data, error } = await query

      if (error) {
        console.error('Error fetching contacts:', error)
        return new Response(
          JSON.stringify({ error: 'Failed to fetch contact messages' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      return new Response(
        JSON.stringify({ success: true, data }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    else if (req.method === 'PUT') {
      const { id, status, notes } = await req.json()
      
      if (!id) {
        return new Response(
          JSON.stringify({ error: 'Contact ID is required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // Get the user's role
      const { data: profileData } = await supabase
        .from('profile')
        .select('role')
        .eq('id', user.id)
        .single()

      const isTeacher = profileData?.role === 'teacher' || profileData?.role === 'admin'
      
      if (!isTeacher) {
        return new Response(
          JSON.stringify({ error: 'Only teachers can update contacts' }),
          { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // Update the contact
      const { data, error } = await supabase
        .from('student_contacts')
        .update({ 
          status: status || undefined, 
          notes: notes || undefined,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)

      if (error) {
        console.error('Error updating contact:', error)
        return new Response(
          JSON.stringify({ error: 'Failed to update contact message' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      return new Response(
        JSON.stringify({ success: true, data }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Unexpected error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
