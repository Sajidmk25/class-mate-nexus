
import { useEffect, useState } from 'react';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@/types/auth.types';
import { mapSupabaseUserToUser } from '@/services/auth.service';

export function useAuthState() {
  const [user, setUser] = useState<User | null>(null);
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up Supabase auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event, currentSession?.user?.id);
        setSession(currentSession);
        setSupabaseUser(currentSession?.user ?? null);
        
        // Convert Supabase user to our User format if session exists
        if (currentSession?.user) {
          const userObj = mapSupabaseUserToUser(currentSession.user);
          setUser(userObj);
        } else {
          setUser(null);
        }
      }
    );

    // Check for existing session
    const initializeSession = async () => {
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        
        console.log("Initial session check:", initialSession?.user?.id);
        
        if (initialSession?.user) {
          setSession(initialSession);
          setSupabaseUser(initialSession.user);
          const userObj = mapSupabaseUserToUser(initialSession.user);
          setUser(userObj);
        }
      } catch (error) {
        console.error("Error getting session:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    initializeSession();

    // Cleanup
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return { user, supabaseUser, session, isLoading };
}
