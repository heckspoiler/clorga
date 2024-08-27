'use client';

import React, { useState } from 'react';
import { newProjectStore } from '@/utils/newProjectStore';

export default function Idea({ styles }: { styles: any }) {
  // Zustand Store
  const { projectIdeas, setProjectIdeas } = newProjectStore();

  console.log(projectIdeas);

  // Local state for the input
  const [ideaInput, setIdeaInput] = useState('');

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdeaInput(e.target.value);
  };

  return (
    <div className={styles.FormCell}>
      <label htmlFor="idea">Idea:</label>
      <input
        id="idea"
        type="text"
        value={ideaInput}
        onChange={handleInputChange}
        placeholder="Enter Idea"
        data-clickable="true"
      />
    </div>
  );
}
