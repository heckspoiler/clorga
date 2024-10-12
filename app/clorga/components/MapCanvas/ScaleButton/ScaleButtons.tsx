import React from 'react';

export default function ScaleButtons({
  styles,
  scaleSize,
  setScaleSize,
  scaleNumber,
}: {
  styles: any;
  scaleSize: number;
  setScaleSize: any;
  scaleNumber: number;
}) {
  return (
    <>
      <div
        style={{ display: 'flex', gap: '0.5rem' }}
        className={styles.ZoomButtons}
      >
        <button onClick={() => setScaleSize(scaleSize + 0.05)}>+</button>
        <button onClick={() => setScaleSize(1)}>100%</button>
        <button onClick={() => setScaleSize(scaleSize - 0.05)}>-</button>
      </div>
      <div className={styles.ZoomWindow}>
        <p>zoom: {scaleNumber}%</p>
      </div>
    </>
  );
}
