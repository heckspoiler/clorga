'use client';

import React, { useEffect, useState } from 'react';

import styles from './BringBackButton.module.css';

import { forminViewportStore } from '@/utils/formInViewportStore';

export default function BringBackButton() {
  const { isInViewport, setShouldComeBack } = forminViewportStore();

  const bringBackTheForm = () => {
    setShouldComeBack(true);

    const timeoutId = setTimeout(() => {
      setShouldComeBack(false);
    }, 1000);

    return () => clearTimeout(timeoutId);
  };

  return (
    <div
      className={`${styles.Container} ${
        !isInViewport ? styles.ContainerVisible : null
      }`}
    >
      <div className={styles.ButtonContainer}>
        <div></div>
        <button onClick={bringBackTheForm}>Bring the Form back!</button>
      </div>
    </div>
  );
}
