'use client';

import React from 'react';
import styles from './PricingCard.module.css';
import Plussign from '../../general/Plussign';
import { PricingTier } from '../PricingTiers';
import Link from 'next/link';

export default function PricingCard({
  pricingTiers,
  isMonthly,
  email,
}: {
  isMonthly: boolean;
  pricingTiers: PricingTier[];
  email: string | undefined;
}) {
  console.log(email);
  return (
    <>
      {pricingTiers.map((tier, index) => (
        <div key={index} className={styles.PricingCard}>
          <div className={styles.TitleContainer}>
            <h2 className={styles.Title}>{tier.title}</h2>
          </div>
          <div className={styles.DescriptionContainer}>
            <Plussign height={'60'} />
          </div>
          <div className={styles.DescriptionContainer}>
            <h5>What's included?</h5>
            <ul>
              {tier.features.map((feature, idx) => (
                <li key={idx}>
                  <span>&#8680;</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.PriceContainer}>
            <h3 className={styles.Price}>
              {tier.price} <span>/ {isMonthly ? 'Month' : 'Year'}</span>
            </h3>
          </div>
          <div className={styles.ButtonContainer}>
            <Link href={tier.link + '?prefilled_email=' + email}>
              Choose Tier
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
