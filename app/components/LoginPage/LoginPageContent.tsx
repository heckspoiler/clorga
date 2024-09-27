import React from 'react';
import { headers } from 'next/headers';
import LoginField from './LoginField';
import styles from './LoginPage.module.css';

export default function LoginPageContent() {
  const headersList = headers();
  const userAgent = headersList.get('user-agent') || '';

  return (
    <div className={styles.Main}>
      <LoginField styles={styles} />
    </div>
  );
}
