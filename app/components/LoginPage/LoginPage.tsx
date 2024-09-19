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
        opacity: 0, // Start with characters faded out
        y: 20, // Start with a slight upward position
        rotation: 0, // Start with no rotation
      },
      {
        x: () => Math.random() * 10 - 5, // Subtle random horizontal movement
        y: () => Math.random() * 20 - 10, // Subtle random vertical movement
        rotation: () => Math.random() * 10 - 5, // Slight rotation for natural effect
        opacity: 1, // Fade to full visibility
        duration: 2, // Smooth, longer duration
        ease: 'power2.inOut', // Smooth easing
        stagger: 0.05, // Stagger for wave-like animation
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
