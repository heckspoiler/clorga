import React from 'react';

import styles from './page.module.css';
import SignupPageContent from '../components/SignupPage/SignupPageContent';
import { Header } from '../components/Header/Header';

export default function page() {
  return (
    <div className={styles.Main}>
      <SignupPageContent />
    </div>
  );
}
