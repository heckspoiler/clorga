import React from 'react';
import Image from 'next/image';

import { cardData } from './CardsObject';

import styles from './SecondSection.module.css';

export default function SecondSection() {
  return (
    <section className={styles.SecondSectionContainer}>
      <div className={styles.CardGrid}>
        {cardData.map((card) => (
          <div className={styles.Card}>
            <div className={styles.CardText}>
              <h2>{card.title}</h2>
              <p>{card.description}</p>
              <div className={styles.LinkContainer}>
                <a href={card.link}>{card.linkText}</a>
              </div>
            </div>
            <Image
              src={card.imageSrc}
              height={220}
              width={220}
              alt={card.imageAlt}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
