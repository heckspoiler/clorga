import React from 'react';

import styles from './page.module.css';
import LoginPageContent from '../components/LoginPage/LoginPageContent';
import { Header } from '../hello/components/Header/Header';

export default function page() {
  return (
    <div className={styles.Main}>
      <Header />
      <LoginPageContent />
    </div>
  );
}
