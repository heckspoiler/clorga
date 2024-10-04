'use client';

import React from 'react';

import Image from 'next/image';
import styles from './FirstSection.module.css';
import TextContentSection from './TextContentSection/TextContentSection';

export default function FirstSection() {
  return (
    <section className={styles.FirstSectionContainer}>
      <div className={styles.Subsection}>
        <TextContentSection />
      </div>
      <div className={styles.Subsection}></div>
    </section>
  );
}
