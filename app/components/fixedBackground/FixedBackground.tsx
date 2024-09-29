'use client';

import React from 'react';

import styles from './FixedBackground.module.css';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function FixedBackground() {
  return (
    <div className={styles.Main}>
      <div className={styles.DecorContainer}>
        <div className={styles.DecorOne} />
        <div className={styles.DecorTwo}>
          <DotLottieReact
            src="https://lottie.host/53c2fa0e-2eed-4efd-8235-25f6b7515b46/drGjFbSptI.json"
            loop
            autoplay
            speed={0.2}
            height={150}
            width={150}
          />
        </div>
      </div>
    </div>
  );
}
