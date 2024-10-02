'use client';

import React from 'react';
import styles from './LoginSection.module.css';
import { logout } from '@/app/logout/actions';
import { User } from '@supabase/auth-helpers-nextjs';

export default function LoginSection({ user }: { user: User | null }) {
  const production = process.env.NODE_ENV === 'production';
  const SignupRender = !production && <a href="/signup">Sign Up</a>;

  return (
    <div className={styles.LoginSection}>
      {user ? (
        <a
          href="/logout"
          onClick={(e) => {
            e.preventDefault();
            logout();
          }}
        >
          Log Out
        </a>
      ) : (
        <>
          <a href="/login">Log In</a> {SignupRender}
        </>
      )}
    </div>
  );
}
