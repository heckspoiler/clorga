import React from 'react';

export default function ScaleContainer({
  styles,
  scaleSize,
  setScaleSize,
}: {
  styles: any;
  scaleSize: number;
  setScaleSize: any;
}) {
  return (
    <div className={styles.ZoomContainer}>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button onClick={() => setScaleSize(scaleSize + 0.05)}>+</button>
        <button onClick={() => setScaleSize(scaleSize - 0.05)}>-</button>
      </div>
      <p>Zoom</p>
    </div>
  );
}
