// Marquee.js
import React from 'react';
import styles from './Marquee.module.css';

const Marquee = ({ text }: { text: string }) => {
  return (
    <div className={styles.MarqueeContainer}>
      <div className={styles.MarqueeContent}>{text}</div>
      <div className={styles.MarqueeContent}>{text}</div>
      <div className={styles.MarqueeContent}>{text}</div>
      <div className={styles.MarqueeContent}>{text}</div>
    </div>
  );
};

export default Marquee;
