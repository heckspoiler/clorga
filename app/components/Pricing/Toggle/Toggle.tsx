import React, { useState, useEffect } from 'react';

import styles from './Toggle.module.css';

export default function Toggle({
  isMonthly,
  setIsMonthly,
}: {
  isMonthly: boolean;
  setIsMonthly: (isMonthly: boolean) => void;
}) {
  const handleClick = () => {
    setIsMonthly(!isMonthly);
  };

  return (
    <div className={styles.SwitchRow}>
      <div
        className={`${styles.Discount} ${
          !isMonthly ? styles.DiscountVisible : ''
        }`}
      >
        <div>
          <p>Save 10%!</p>
        </div>
      </div>
      <div className={styles.SwitchContainer}>
        <h5>Monthly</h5>
        <div className={styles.SwitcherContainer} onClick={handleClick}>
          <div className={styles.Switch}>
            <div
              className={`${styles.SwitchToggle} ${
                !isMonthly ? styles.IsYearly : null
              }`}
            ></div>
          </div>
        </div>
        <h5>Yearly</h5>
      </div>
    </div>
  );
}
