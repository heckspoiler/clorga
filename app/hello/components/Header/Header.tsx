'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import styles from './Header.module.css';
import Logo from './components/Logo';
import Navbar from './components/Navbar/Navbar';
import LoginSection from './components/LoginSection/LoginSection';
import { usePathname } from 'next/navigation';

const onlyLogoPaths = ['/login', '/signup', '/forgotpassword', 'logout'];

export default function Header() {
  const headerRef = useRef(null);
  const pathname = usePathname();

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
    let timeoutId: any = null;

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
            <LoginSection />
          </div>
        </>
      )}
    </header>
  );
}
