
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { corsHeaders } from '../../api/_shared/cors.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.2'
import { getAuthUser } from '../../api/_shared/auth.ts'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || ''
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }
  
  try {
    const supabaseClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
    
    // Verify the requester is an admin
    const authUser = await getAuthUser(req, supabaseClient)
    
    if (!authUser) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }
    
    // Check if user is an admin
    const { data: userProfile, error: profileError } = await supabaseClient
      .from('profile')
      .select('role')
      .eq('id', authUser.id)
      .single()
      
    if (profileError || userProfile?.role !== 'admin') {
      return new Response(JSON.stringify({ error: 'Admin privileges required' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }
    
    // Get all users
    const { data: profiles, error: profilesError } = await supabaseClient
      .from('profile')
      .select('id, full_name, role, student_id')
      .order('created_at', { ascending: false })
    
    if (profilesError) {
      console.error('Error fetching profiles:', profilesError)
      return new Response(JSON.stringify({ error: profilesError.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }
    
    // Get emails for all users
    const { data: usersData, error: usersError } = await supabaseClient.auth.admin
      .listUsers()
    
    if (usersError) {
      console.error('Error fetching users:', usersError)
      return new Response(JSON.stringify({ error: usersError.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }
    
    // Combine profile and user data
    const users = profiles.map(profile => {
      const authUser = usersData.users.find(u => u.id === profile.id)
      return {
        id: profile.id,
        email: authUser?.email || '',
        name: profile.full_name,
        role: profile.role,
        student_id: profile.student_id
      }
    })
    
    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Error in users edge function:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
