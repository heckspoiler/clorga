'use client';

import React from 'react';
import styles from './LoginSection.module.css';
import { logout } from '@/app/logout/actions';
import { User } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';

export default function LoginSection({ user }: { user: User | null }) {
  const production = process.env.NODE_ENV === 'production';
  const SignupRender = !production && <Link href="/signup">Sign Up</Link>;

  return (
    <div className={styles.LoginSection}>
      {user ? (
        <>
          <Link
            href="/logout"
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
          >
            Log Out
          </Link>
          <Link href="/clorga">Your Clorga</Link>
        </>
      ) : (
        <>
          <Link href="/login">Log In</Link> {SignupRender}
        </>
      )}
    </div>
  );
}
