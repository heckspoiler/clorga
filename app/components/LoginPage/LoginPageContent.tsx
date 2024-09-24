'use client';

import React, { useRef, useState, useEffect } from 'react';
import styles from './LoginPage.module.css';

import LoginField from './LoginField';

import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(SplitText, useGSAP);

export default function LoginPageContent() {
  const [workingOnIt, setWorkingOnIt] = useState(true);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      setWorkingOnIt(false);
      setShowLogin(false);
      return () => {
        // Cleanup function goes here if needed
      };
    }
  }, []);

  const textRef = useRef(null);

  useGSAP(() => {
    const split = new SplitText(textRef.current, { type: 'words, chars' });

    gsap.fromTo(
      split.chars,
      {
        y: 20,
        scale: 0.9,
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
      {showLogin ? (
        <LoginField styles={styles} />
      ) : (
        <>
          <h1 ref={textRef}>Clorga</h1>
          <h3>coming soon</h3>
          <h5>yes something's cooking</h5>
        </>
      )}
    </div>
  );
}
