
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.2'
import { corsHeaders } from './cors.ts'

export async function getAuthUser(req: Request, supabase: any) {
  try {
    // Get the authorization header
    const authHeader = req.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('No valid authorization header found')
      return null
    }

    const token = authHeader.replace('Bearer ', '')
    
    // Verify the token
    const { data: { user }, error } = await supabase.auth.getUser(token)
    
    if (error) {
      console.error('Auth error:', error)
      return null
    }
    
    if (!user) {
      console.log('No user found for token')
      return null
    }

    return user
  } catch (err) {
    console.error('Exception in getAuthUser:', err)
    return null
  }
}
