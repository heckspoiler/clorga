import React from 'react';
import { headers } from 'next/headers';
import SignupField from './SignupField';
import styles from './SignupPage.module.css';

export default function LoginPageContent() {
  const headersList = headers();
  const userAgent = headersList.get('user-agent') || '';

  return (
    <div className={styles.Main}>
      <SignupField />
    </div>
  );
}
