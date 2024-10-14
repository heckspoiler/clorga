'use client';

import React from 'react';

import styles from './ColorField.module.css';

import { newProjectStore } from '@/utils/newProjectStore';

import { useResetOnSubmit } from '@/utils/helpers/fieldReset';
import { isSubmittedStore } from '@/utils/isSubmittedStore';

import { pastelColors } from '@/utils/colorArrays';
export default function ColorField() {
  const { projectColor, setProjectColor } = newProjectStore();
  const isSubmitted = isSubmittedStore((state) => state.isSubmitted);

  useResetOnSubmit(isSubmitted, () => setProjectColor(''), []);
  return (
    <div className={styles.ColorContainer}>
      <label>Set Mood:</label>
      <div className={styles.ColorField}>
        {pastelColors.map((color) => (
          <div
            key={color}
            className={`${styles.Color} ${
              projectColor === color ? styles.Selected : ''
            }`}
            style={{ backgroundColor: color }}
            onClick={() => setProjectColor(color)}
          ></div>
        ))}
      </div>
    </div>
  );
}
