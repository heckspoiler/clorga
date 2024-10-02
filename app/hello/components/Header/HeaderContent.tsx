'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
import Logo from './components/Logo';
import Navbar from './components/Navbar/Navbar';
import LoginSection from './components/LoginSection/LoginSection';

const onlyLogoPaths = [
  '/login',
  '/signup',
  '/forgotpassword',
  '/logout',
  '/dashboard',
];

export function HeaderContent({ user }: { user: any }) {
  const pathname = usePathname();
  const headerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  const handleScroll = useCallback(() => {
    const currentScroll = window.scrollY;
    if (currentScroll > lastScroll && currentScroll > 100) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    setLastScroll(currentScroll);
  }, [lastScroll]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const throttledHandleScroll = () => {
      if (timeoutId === null) {
        timeoutId = setTimeout(() => {
          handleScroll();
          timeoutId = null;
        }, 100);
      }
    };

    window.addEventListener('scroll', throttledHandleScroll);

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [handleScroll]);

  const headerClasses = `${styles.Header} ${
    !isVisible ? styles.HeaderHidden : ''
  }`;

  return (
    <header className={headerClasses} ref={headerRef}>
      <div className={styles.Container}>
        <Logo styles={styles} />
      </div>
      {!onlyLogoPaths.includes(pathname) && (
        <>
          <div className={styles.Container}>
            <Navbar />
          </div>
          <div className={styles.Container}>
            <LoginSection user={user} />
          </div>
        </>
      )}
    </header>
  );
}
