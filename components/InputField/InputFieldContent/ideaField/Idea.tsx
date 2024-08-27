'use client';

import React, { useEffect, useState } from 'react';
import { newProjectStore } from '@/utils/newProjectStore';

export default function Idea({ styles }: { styles: any }) {
  // Zustand Store
  const { ideaTitle, setIdeaTitle } = newProjectStore();

  // Local state for the input
  const [ideaInput, setIdeaInput] = useState('');

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdeaTitle(e.target.value);
  };

  useEffect(() => {
    console.log(ideaTitle);
  }, [ideaTitle]);

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
