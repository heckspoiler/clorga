'use client';

import Plussign from '@/app/components/general/Plussign';
import React from 'react';

export default function Logo({ styles }: { styles: any }) {
  return (
    <div className={styles.LogoContainer}>
      <a href="/hello">
        <h2>Clorga</h2>
      </a>
      <div className={styles.LogoSvgContainer}>
        <Plussign width={'25'} height={'25'} strokeWidth={'2'} />
      </div>
    </div>
  );
}
