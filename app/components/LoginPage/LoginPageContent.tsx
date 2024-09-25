import React from 'react';
import { headers } from 'next/headers';
import LoginField from './LoginField';
import styles from './LoginPage.module.css';

export default function LoginPageContent() {
  const headersList = headers();
  const userAgent = headersList.get('user-agent') || '';
  const isProduction = process.env.NODE_ENV === 'production';
  const showLogin = !isProduction;

  return (
    <div className={styles.Main}>
      {showLogin ? (
        <LoginField styles={styles} />
      ) : (
        <>
          <h1>Clorga</h1>
          <h3>coming soon</h3>
          <h5>yes something's cooking</h5>
        </>
      )}
    </div>
  );
}
