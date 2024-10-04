'use client';

import React from 'react';
import GithubLogo from '../../general/GithubLogo';
import GoogleLogo from '../../general/GoogleLogo';
import { usePathname } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import styles from './Multistep.module.css';

const isProduction = process.env.NODE_ENV === 'production';

export default function AuthButtons() {
  const pathname = usePathname();
  const supabase = createClient();

  const signInWithProvider = async (provider: 'github' | 'google') => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: location.origin + '/oAuth/callback',
      },
    });

    if (error) {
      console.error('Error signing in:', error.message);
      return;
    }

    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();

    if (sessionError || !sessionData?.session?.user?.email) {
      console.error(
        'Error fetching session:',
        sessionError?.message || 'No user session'
      );
      return;
    }

    const user = sessionData.session.user;

    const { error: insertError } = await supabase.from('users').upsert({
      id: user.id,
      email: user.email,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    if (insertError) {
      console.error(
        'Error inserting user into users table:',
        insertError.message
      );
    }
  };

  return (
    <>
      <div
        className={styles.OtherAuth}
        style={{
          transform: pathname === '/login' ? 'scale(0.7)' : 'scale(1)',
        }}
      >
        <button onClick={() => signInWithProvider('github')}>
          <GithubLogo width={25} height={25} />
        </button>
        <button onClick={() => signInWithProvider('google')}>
          <GoogleLogo width={25} height={25} />
        </button>
      </div>
    </>
  );
}
