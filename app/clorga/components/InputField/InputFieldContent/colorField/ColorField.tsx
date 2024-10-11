'use client';

import React from 'react';

import styles from './ColorField.module.css';

import { newProjectStore } from '@/utils/newProjectStore';

import { pastelColors } from '@/utils/colorArray';
export default function ColorField() {
  const { projectColor, setProjectColor } = newProjectStore();
  return (
    <div className={styles.ColorContainer}>
      <label>Set Mood</label>
      <div className={styles.ColorField}>
        {pastelColors.map((color) => (
          <div
            key={color}
            className={styles.Color}
            style={{ backgroundColor: color }}
            onClick={() => setProjectColor(color)}
          ></div>
        ))}
      </div>
    </div>
  );
}
