'use client';

import React from 'react';

import Image from 'next/image';
import styles from './FirstSection.module.css';
import TextContentSection from './TextContentSection/TextContentSection';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function FirstSection() {
  return (
    <section className={styles.FirstSectionContainer}>
      <div className={styles.Subsection}>
        <TextContentSection />
      </div>
      <div className={styles.Subsection}>
        <div className={styles.LottieContainer}>
          <DotLottieReact
            src="https://lottie.host/f5a77cd6-4f83-4901-926d-9a316ac7a656/PYxPfE43Gf.lottie"
            autoplay
            height={400}
            width={400}
            speed={0.8}
          />
        </div>
      </div>
    </section>
  );
}
