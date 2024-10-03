// Header.tsx
import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { HeaderContent } from './HeaderContent';

export async function Header() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <HeaderContent user={user} />;
}
