'use client';

import React, { useState, useEffect, useCallback } from 'react';
import styles from './Topbar.module.css';
import Triangle from '../general/Triangle';
import Navigation from './Navigation';
import UserIcon from '../general/UserIcon';

export default function Topbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [color, setColor] = useState('white');
  const [longestStrokeColor, setLongestStrokeColor] = useState('white');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

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
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [isHovered, isVisible]);

  useEffect(() => {
    setColor(isVisible ? 'white' : 'rgb(255, 229, 0)');
  }, [isVisible]);

  return (
    <header
      className={`${styles.Topbar} ${isVisible ? styles.TopbarVisible : ''}`}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.TopbarContainer} onMouseEnter={handleMouseEnter}>
        <div>
          <h2>CLORGA</h2>
        </div>
        <Navigation styles={styles} />
        <div className={styles.UserIconContainer}>
          <UserIcon width={64 / 3} height={77 / 3} strokeWidth={4} />
        </div>
      </div>
      <div className={styles.ArrowDown} onMouseEnter={handleMouseEnter}>
        <Triangle
          color={color}
          height={66 / 4.4}
          width={145 / 4.4}
          strokeWidth={4}
          longestStrokeColor={longestStrokeColor}
          styles={styles}
        />
      </div>
    </header>
  );
}
