'use client';

import React from 'react';

import styles from './PricingCard.module.css';
import Plussign from '../../general/Plussign';

export default function PricingCard() {
  return (
    <>
      <div className={styles.PricingCard}>
        <div className={styles.TitleContainer}>
          <h2 className={styles.Title}>Free Tier</h2>
        </div>
        <div className={styles.DescriptionContainer}>
          <Plussign height={'100'} />
        </div>
        <div className={styles.DescriptionContainer}>
          <h5>What's included?</h5>
          <ul>
            <li>
              <span>&rarr;</span>1 User
            </li>
            <li>
              <span>&rarr;</span>3 Projects
            </li>
            <li>
              <span>&rarr;</span>5 GB Storage
            </li>
            <li>
              <span>&rarr;</span>Email Support
            </li>
            <li>
              <span>&rarr;</span>Basic Analytics
            </li>
          </ul>
        </div>
        <div className={styles.ButtonContainer}>
          <button>Choose Tier</button>
        </div>
      </div>
    </>
  );
}
