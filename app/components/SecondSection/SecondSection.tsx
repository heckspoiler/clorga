import React from 'react';
import Image from 'next/image';

import { cardData } from './CardsObject';

import styles from './SecondSection.module.css';
import Link from 'next/link';

export default function SecondSection() {
  return (
    <section className={styles.SecondSectionContainer}>
      <div className={styles.CardGrid}>
        {cardData.map((card, index) => (
          <div className={styles.Card} key={index}>
            <div className={styles.CardText}>
              <h2>{card.title}</h2>
              <p>{card.description}</p>
              <div className={styles.LinkContainer}>
                <Link href={card.link}>{card.linkText}</Link>
              </div>
            </div>
            <div className={styles.CardImage}>
              <Image
                src={card.imageSrc}
                height={200}
                width={200}
                alt={card.imageAlt}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
