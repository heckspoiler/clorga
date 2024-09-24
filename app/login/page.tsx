import React from 'react';

import styles from './page.module.css';
import LoginPageContent from '../components/LoginPage/LoginPageContent';

export default function page() {
  return (
    <div className={styles.Main}>
      <LoginPageContent />
    </div>
  );
}
