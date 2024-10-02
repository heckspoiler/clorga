import { User as SupabaseUser } from '@supabase/supabase-js';

type LoggedUser = {
  id: string;
  email: string;
  name: string;
};

export type User = SupabaseUser & LoggedUser;
