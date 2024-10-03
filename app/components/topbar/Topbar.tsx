'use client';

import React, { useState, useEffect, useCallback } from 'react';
import styles from './Topbar.module.css';
import Triangle from '../general/Triangle';
import Navigation from './Navigation';
import UserSpaceIcon from './UserSpaceIcon';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

// const noRenderPaths = [
//   'login',
//   'logout',
//   'hello',
//   'signup',
//   'error',
//   'dashboard',
// ];

const TOOLTIP_HIDE_DELAY = 3000;

export default function Topbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [color, setColor] = useState('white');
  const [longestStrokeColor, setLongestStrokeColor] = useState('white');
  const pathname = usePathname();

  const [first] = pathname.split('/').slice(1);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    setIsVisible(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isHovered && isVisible) {
      timer = setTimeout(() => {
        setIsVisible(false);
      }, TOOLTIP_HIDE_DELAY);
    }
    return () => clearTimeout(timer);
  }, [isHovered, isVisible, first]);

  useEffect(() => {
    setColor(isVisible ? 'white' : '#bedaf7');
  }, [isVisible]);

  return (
    <div
      className={`${styles.Topbar} ${isVisible ? styles.TopbarVisible : ''}`}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.TopbarContainer} onMouseEnter={handleMouseEnter}>
        <div>
          <Link href="/">
            <h2>CLORGA</h2>
          </Link>
        </div>
        <Navigation styles={styles} />
        <UserSpaceIcon
          width={64 / 3}
          height={77 / 3}
          strokeWidth={4}
          styles={styles}
        />
      </div>
      <div className={styles.ArrowDown} onMouseEnter={handleMouseEnter}>
        <Triangle
          color={color}
          height={66 / 4.4}
          width={145 / 4.4}
          strokeWidth={2}
          longestStrokeColor={longestStrokeColor}
          styles={styles}
        />
      </div>
    </div>
  );
}
