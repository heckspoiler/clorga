'use client';

import Link from 'next/link';
import React from 'react';

export default function Logo({ styles }: { styles: any }) {
  return (
    <div className={styles.LogoContainer}>
      <Link href="/">
        <h2>
          <span>C</span>
          <span>l</span>
          <span>o</span>
          <span>r</span>
          <span>g</span>
          <span>a</span>
        </h2>
      </Link>
    </div>
  );
}
