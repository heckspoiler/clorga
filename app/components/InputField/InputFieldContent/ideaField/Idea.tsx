'use client';

import React, { useEffect, useState } from 'react';
import { newProjectStore } from '@/utils/newProjectStore';
import { isSubmittedStore } from '@/utils/isSubmittedStore';

export default function Idea({ styles }: { styles: any }) {
  // Zustand Store
  const { ideaTitle, setIdeaTitle } = newProjectStore();
  const { isSubmitted } = isSubmittedStore();

  useEffect(() => {
    if (isSubmitted) {
      setIdeaTitle('');
    }
  }, [isSubmitted, setIdeaTitle]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdeaTitle(e.target.value);
  };

  return (
    <div className={styles.FormCell}>
      <label htmlFor="idea">Idea Title:</label>
      <input
        id="idea"
        type="text"
        value={ideaTitle}
        onChange={handleInputChange}
        placeholder="Enter Idea"
        data-clickable="true"
      />
    </div>
  );
}
