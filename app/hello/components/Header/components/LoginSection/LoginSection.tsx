import React from 'react';

import styles from './LoginSection.module.css';

export default function LoginSection() {
  const production = process.env.NODE_ENV === 'production';

  return (
    <div className={styles.LoginSection}>
      <a href="/login">Log In</a>
      {!production ?? <a href="/signup">Sign Up</a>}
    </div>
  );
}
