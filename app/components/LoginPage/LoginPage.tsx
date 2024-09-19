'use client';

import React, { useEffect, useRef } from 'react';
import styles from './LoginPage.module.css';

import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(SplitText, useGSAP);

export default function LoginPage() {
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }
  const textRef = useRef(null);

  useGSAP(() => {
    const split = new SplitText(textRef.current, { type: 'words, chars' });

    gsap.from(split.chars, {
      x: () => Math.random() * 80 - 20,
      y: () => Math.random() * 80 - 20,
      duration: Math.random() * 4 * 0.5,
      ease: 'power1.inOut',
      stagger: Math.random() * 4 * 0.1,
      yoyo: true,
      repeat: -1,
    });

    return () => {
      split.revert();
    };
  }, []);

  return (
    <div className={styles.Main}>
      <h1 ref={textRef}>Clorga</h1>
      <h3>coming soong</h3>
    </div>
  );
}
