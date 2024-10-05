'use client';

import React, { useState } from 'react';
import styles from './Pricing.module.css';
import PricingCard from './Card/PricingCard';
import Toggle from './Toggle/Toggle';

import { monthlyPricingTiers, yearlyPricingTiers } from './PricingTiers';

const Pricing = ({ email }: { email: string | undefined }) => {
  const [isMonthly, setIsMonthly] = useState(true);

  return (
    <>
      <section id="pricing" className={styles.PricingSection}>
        <div className={styles.PricingContainer}>
          <div className={styles.TitleContainer}>
            <h2>Subscribe to Clorga</h2>
          </div>

          <Toggle isMonthly={isMonthly} setIsMonthly={setIsMonthly} />
          <div className={styles.CardContainer}>
            <PricingCard
              pricingTiers={
                isMonthly ? monthlyPricingTiers : yearlyPricingTiers
              }
              isMonthly={isMonthly}
              email={email}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Pricing;
