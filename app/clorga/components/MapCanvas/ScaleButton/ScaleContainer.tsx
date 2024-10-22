'use client';

import React, { useEffect, useState } from 'react';
import FormVisibleButton from '../FormVisibleButton/FormVisibleButton';
import styles from './ScaleContainer.module.css';
import Keybinds from './Keybinds/Keybinds';
import { Scale } from 'lucide-react';
import ScaleButtons from './ScaleButtons';
import ShowLinesButton from '../ShowLinesButton/ShowLinesButton';

export default function ScaleContainer({
  scaleSize,
  setScaleSize,
  isVisible,
  setIsVisible,
  setShowLines,
  showLines,
}: {
  styles?: any;
  scaleSize: number;
  setScaleSize: any;
  isVisible: boolean;
  setIsVisible: any;
  setShowLines: any;
  showLines: boolean;
}) {
  const [scaleNumber, setScaleNumber] = useState(100);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setScaleNumber(Math.round(scaleSize * 100));
  }, [scaleSize]);

  return (
    <div className={styles.ZoomContainer}>
      <ShowLinesButton
        styles={styles}
        setShowLines={setShowLines}
        showLines={showLines}
      />
      <FormVisibleButton isVisible={isVisible} setIsVisible={setIsVisible} />
      <div
        className={styles.ZoomLegendWindow}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <p>show keybinds</p>
      </div>
      <ScaleButtons
        styles={styles}
        scaleSize={scaleSize}
        setScaleSize={setScaleSize}
        scaleNumber={scaleNumber}
      />
      <Keybinds styles={styles} isHovered={isHovered} />
    </div>
  );
}
