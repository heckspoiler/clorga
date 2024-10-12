import React from 'react';

import styles from './CellContainer.module.css';

export default function CellContainer({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className={styles.Container}>
      <h3>{title.toUpperCase()}</h3>

      {children}
    </div>
  );
}
