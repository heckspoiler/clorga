'use client';

import React from 'react';

import styles from './Header.module.css';

import Logo from './components/Logo';
import Navbar from './components/Navbar/Navbar';
import LoginSection from './components/LoginSection/LoginSection';

import { usePathname } from 'next/navigation';

const onlyLogoPaths = ['/login', '/signup', '/forgotpassword', 'logout'];

export default function Header() {
  const pathname = usePathname();

  return (
    <>
      {onlyLogoPaths.includes(pathname) ? (
        <header className={styles.Header}>
          <div className={styles.Container}>
            <Logo styles={styles} />
          </div>
        </header>
      ) : (
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
      )}
    </>
  );
}
