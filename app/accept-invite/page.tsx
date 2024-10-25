import React from 'react';

import styles from './page.module.css';
import AcceptInviteContent from './AcceptInviteContent';

export default function page() {
  return (
    <div className={styles.Page}>
      <AcceptInviteContent />
    </div>
  );
}
