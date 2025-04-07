
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.2'
import { corsHeaders } from './cors.ts'

export async function getAuthUser(req: Request, supabase: any) {
  // Get the authorization header
  const authHeader = req.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }

  const token = authHeader.replace('Bearer ', '')
  
  // Verify the token
  const { data: { user }, error } = await supabase.auth.getUser(token)
  
  if (error || !user) {
    console.error('Auth error:', error)
    return null
  }

  return user
}
