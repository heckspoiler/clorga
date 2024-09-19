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

    gsap.fromTo(
      split.chars,
      {
        y: 20,
        scale: 0.9, // Start with a slight scale down
        rotation: 0,
      },
      {
        x: () => Math.random() * 8 - 4, // Subtle horizontal sway
        y: () => Math.random() * 12 - 6, // Gentle vertical float
        rotation: () => Math.random() * 6 - 3, // Slight rotation for organic motion
        scale: 1, // Scale up slightly for a subtle "breath" effect
        opacity: 1,
        duration: 3, // Longer duration for smooth motion
        ease: 'sine.inOut', // Smooth, natural easing
        stagger: 0.1, // Small stagger for a flowing effect
        yoyo: true,
        repeat: -1,
      }
    );

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
