import React from 'react';

import styles from './Header.module.css';

import Logo from './components/Logo';
import Navbar from './components/Navbar/Navbar';
import LoginSection from './components/LoginSection/LoginSection';

export default function Header() {
  return (
    <header className={styles.Header}>
      <div className={styles.Container}>
        <Logo styles={styles} />
      </div>
      <div className={styles.Container}>
        <Navbar />
      </div>
      <div className={styles.Container}>
        <LoginSection />
      </div>
    </header>
  );
}
