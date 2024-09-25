'use client';

import React, { useState, useEffect, useCallback } from 'react';
import styles from './Topbar.module.css';
import Triangle from '../general/Triangle';

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
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [isHovered, isVisible]);

  useEffect(() => {
    setColor(isVisible ? 'white' : 'rgb(255, 229, 0)');
  }, [isVisible]);

  return (
    <header
      className={`${styles.Topbar} ${isVisible ? styles.TopbarVisible : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.TopbarContainer}>
        <div>
          <h2>CLORGA</h2>
        </div>
      </div>
      <div className={styles.ArrowDown}>
        <Triangle
          color={color}
          height={66 / 3}
          width={145 / 3}
          strokeWidth={3}
          longestStrokeColor={longestStrokeColor}
          styles={styles}
        />
      </div>
    </header>
  );
}
