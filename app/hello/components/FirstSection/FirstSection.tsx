import React from 'react';

import Image from 'next/image';
import styles from './FirstSection.module.css';
import TextContentSection from './TextContentSection/TextContentSection';

export default function FirstSection() {
  return (
    <div className={styles.FirstSectionContainer}>
      <div className={styles.Subsection}>
        <TextContentSection />
      </div>
      <div className={styles.Subsection}>
        <Image src="/images/thingy.png" height={600} width={600} alt="Thingy" />
      </div>
    </div>
  );
}
