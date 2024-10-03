'use client';

import React, { useRef } from 'react';
import styles from './TextContentSection.module.css';
import TitleContainer from './TitleContainer';
import Link from 'next/link';

export default function TextContentSection() {
  return (
    <div className={styles.TextContentSection}>
      <TitleContainer styles={styles} />
      <p>
        I understand you need to import an image from the public folder in a
        Next.js app using the App Router. In Next.js 13+ with the App Router,
        the way to handle static assets like images has changed.
      </p>
      <div className={styles.FindOutMoreLink}>
        <Link href="/about">Find out more</Link>
      </div>
    </div>
  );
}
