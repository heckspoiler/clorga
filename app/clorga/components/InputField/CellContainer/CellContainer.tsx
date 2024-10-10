import React from 'react';

import styles from './CellContainer.module.css';

export default function CellContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles.Container}>{children}</div>;
}
