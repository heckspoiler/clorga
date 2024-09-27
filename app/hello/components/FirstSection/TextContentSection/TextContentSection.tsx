import React from 'react';
import styles from './TextContentSection.module.css';

import Plussign from '@/app/components/general/Plussign';

export default function TextContentSection() {
  return (
    <div className={styles.TextContentSection}>
      <h1>
        <span>
          Clorga <Plussign height={'40'} width={'40'} />
        </span>{' '}
        gives you a new way of organizing your{' '}
        <span>
          creativity <Plussign height={'40'} width={'40'} />
          <Plussign height={'40'} width={'40'} />
          <Plussign height={'40'} width={'40'} />
        </span>
      </h1>
      <p>
        I understand you need to import an image from the public folder in a
        Next.js app using the App Router. In Next.js 13+ with the App Router,
        the way to handle static assets like images has changed.
      </p>
      <div className={styles.FindOutMoreLink}>
        <a href="/about">Find out more</a>
      </div>
    </div>
  );
}
