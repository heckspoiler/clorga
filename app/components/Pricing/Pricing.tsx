'use client';

import React, { useState } from 'react';
import styles from './Pricing.module.css';
import PricingCard from './Card/PricingCard';
import Toggle from './Toggle/Toggle';

const Pricing = ({ email }: { email: string | undefined }) => {
  const [isMonthly, setIsMonthly] = useState(true);

  return (
    <>
      <section id="pricing" className={styles.PricingSection}>
        <div className={styles.PricingContainer}>
          <h2>Subscribe to Clorga</h2>
          <Toggle isMonthly={isMonthly} setIsMonthly={setIsMonthly} />
          <div className={styles.CardContainer}>
            <PricingCard />
            <PricingCard />
            <PricingCard />
          </div>
        </div>
      </section>
    </>
  );
};

export default Pricing;
