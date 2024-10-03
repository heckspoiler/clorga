'use client';

import Plussign from '@/app/components/general/Plussign';
import Link from 'next/link';
import React from 'react';

export default function Logo({ styles }: { styles: any }) {
  return (
    <Link href="/">
      <div className={styles.LogoContainer}>
        <div className={styles.LogoSvgContainer}>
          <Plussign width={'25'} height={'25'} strokeWidth={'2'} />
        </div>
        <h2>Clorga</h2>
      </div>
    </Link>
  );
}
