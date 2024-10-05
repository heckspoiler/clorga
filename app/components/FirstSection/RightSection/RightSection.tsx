import React from 'react';
import Plussign from '../../general/Plussign';

export default function RightSection({ styles }: { styles: any }) {
  return (
    <>
      {' '}
      <div className={styles.RotateContainer}>
        <div className={styles.Rotate}>
          <Plussign width={'300'} />
        </div>
      </div>
      <div className={styles.RotateContainer}>
        <div className={styles.Rotate}>
          <Plussign width={'300'} />
        </div>
      </div>
      <div className={styles.RotateContainer}>
        <div className={styles.Rotate}>
          <Plussign width={'300'} />
        </div>
      </div>
      <div className={styles.RotateContainer}>
        <div className={styles.Rotate}>
          <Plussign width={'300'} />
        </div>
      </div>
    </>
  );
}
