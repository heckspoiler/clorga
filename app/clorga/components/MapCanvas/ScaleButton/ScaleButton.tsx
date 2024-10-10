import React from 'react';
import FormVisibleButton from '../FormVisibleButton/FormVisibleButton';

export default function ScaleContainer({
  styles,
  scaleSize,
  setScaleSize,
  isVisible,
  setIsVisible,
}: {
  styles: any;
  scaleSize: number;
  setScaleSize: any;
  isVisible: boolean;
  setIsVisible: any;
}) {
  return (
    <div className={styles.ZoomContainer}>
      <FormVisibleButton isVisible={isVisible} setIsVisible={setIsVisible} />
      <div
        style={{ display: 'flex', gap: '0.5rem' }}
        className={styles.ZoomButtons}
      >
        <button onClick={() => setScaleSize(scaleSize + 0.05)}>+</button>
        <button onClick={() => setScaleSize(1)}>100%</button>
        <button onClick={() => setScaleSize(scaleSize - 0.05)}>-</button>
      </div>
    </div>
  );
}
