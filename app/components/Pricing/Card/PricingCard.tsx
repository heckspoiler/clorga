'use client';

import React from 'react';

import styles from './PricingCard.module.css';

export default function PricingCard() {
  return (
    <>
      <div className={styles.PricingCard}>
        <div className={styles.TitleContainer}>
          <h2 className={styles.Title}>Free Tier</h2>
        </div>

        <div className={styles.DescriptionContainer}>
          <ul>
            <li>1 User</li>
            <li>3 Projects</li>
            <li>5 GB Storage</li>
          </ul>
        </div>
      </div>
    </>
  );
}
