
// Follow this setup guide to integrate the Deno runtime for Edge Functions:
// https://docs.supabase.com/docs/guides/functions/edge-functions
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
}

// Define routes and handlers
const routes = {
  '/api/hello': handleHello,
  '/api/user': handleUser,
  '/api/contacts': handleContacts,
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const path = url.pathname;
    
    // Match path to handler
    for (const [route, handler] of Object.entries(routes)) {
      if (path.endsWith(route)) {
        return await handler(req);
      }
    }

    // If no handler matches, return 404
    return new Response(
      JSON.stringify({ error: 'Not Found' }),
      { 
        status: 404, 
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        } 
      }
    );

  } catch (error) {
    console.error('Error processing request:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        } 
      }
    );
  }
});

// Handler for /api/hello route
async function handleHello(req: Request) {
  return new Response(
    JSON.stringify({ message: 'Hello from Supabase Edge Functions!' }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    }
  );
}

// Handler for /api/user route - requires authentication
async function handleUser(req: Request) {
  // Get the JWT from the Authorization header
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    return new Response(
      JSON.stringify({ error: 'Missing Authorization header' }),
      {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    );
  }

  // Extract JWT token
  const token = authHeader.replace('Bearer ', '');

  // In a real app, you would verify the token and extract user information
  // For this example, we'll just simulate a response
  return new Response(
    JSON.stringify({
      id: 'simulated-user-id',
      name: 'Demo User',
      role: 'student',
      message: 'This endpoint would typically return real user data after JWT verification'
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    }
  );
}

// Handler for /api/contacts route - Forward to the contacts handler
async function handleContacts(req: Request) {
  // Import the contacts handler function dynamically
  const { default: contactsHandler } = await import('./contacts/index.ts');
  return await contactsHandler(req);
}
