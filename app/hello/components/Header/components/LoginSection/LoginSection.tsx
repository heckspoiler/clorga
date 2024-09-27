import React from 'react';

import styles from './LoginSection.module.css';

export default function LoginSection() {
  return (
    <div className={styles.LoginSection}>
      <a href="/login">Log In</a>
      <a href="/signup">Sign Up</a>
    </div>
  );
}
