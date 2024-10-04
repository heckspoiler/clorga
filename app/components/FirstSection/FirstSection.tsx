'use client';

import React from 'react';

import Image from 'next/image';
import styles from './FirstSection.module.css';
import TextContentSection from './TextContentSection/TextContentSection';
import Marquee from './Marquee/Marquee';

export default function FirstSection() {
  return (
    <section className={styles.FirstSectionContainer}>
      <section className={styles.UpperSection}>
        <div className={styles.Subsection}>
          <TextContentSection />
        </div>
        <div className={styles.Subsection}>
          <div>
            <h1>hlloeoej</h1>
          </div>
        </div>
      </section>
      <section className={styles.LowerSection}>
        <Marquee text="I understand you need to import an image from the public folder in a Next.js app using the App Router. " />
      </section>
    </section>
  );
}
