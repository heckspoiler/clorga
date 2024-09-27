'use client';

import React, { useState, useEffect, useCallback } from 'react';
import styles from './Topbar.module.css';
import Triangle from '../general/Triangle';
import Navigation from './Navigation';
import UserSpaceIcon from './UserSpaceIcon';
import { usePathname } from 'next/navigation';

const noRenderPaths = ['login', 'logout', 'hello'];

const TOOLTIP_HIDE_DELAY = 3000;

export default function Topbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [color, setColor] = useState('white');
  const [longestStrokeColor, setLongestStrokeColor] = useState('white');
  const pathname = usePathname();

  const [first, second, third] = pathname.split('/').slice(1);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    setIsVisible(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isHovered && isVisible && !noRenderPaths.includes(first)) {
      timer = setTimeout(() => {
        setIsVisible(false);
      }, TOOLTIP_HIDE_DELAY);
    }
    return () => clearTimeout(timer);
  }, [isHovered, isVisible, pathname]);

  useEffect(() => {
    setColor(isVisible ? 'white' : 'rgb(255, 229, 0)');
  }, [isVisible]);

  return (
    <>
      {noRenderPaths.includes(first) ? null : (
        <header
          className={`${styles.Topbar} ${
            isVisible ? styles.TopbarVisible : ''
          }`}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className={styles.TopbarContainer}
            onMouseEnter={handleMouseEnter}
          >
            <div>
              <h2>CLORGA</h2>
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
              strokeWidth={4}
              longestStrokeColor={longestStrokeColor}
              styles={styles}
            />
          </div>
        </header>
      )}
    </>
  );
}
