'use client';

import React, { useEffect, useRef } from 'react';
import { newProjectStore } from '@/utils/newProjectStore';
import { isSubmittedStore } from '@/utils/isSubmittedStore';

export default function By({ styles }: { styles: any }) {
  //zustand store
  const { ideaAuthor, setIdeaAuthor } = newProjectStore();
  const { isSubmitted, setIsSubmitted } = isSubmittedStore();

  useEffect(() => {
    if (isSubmitted) {
      setIdeaAuthor('');
    }
  }, [isSubmitted, setIdeaAuthor]);

  // handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdeaAuthor(e.target.value);
  };
  return (
    <div className={styles.FormCell}>
      <label htmlFor="name">By:</label>
      <input
        id="name"
        type="text"
        placeholder="Enter Name"
        data-clickable="true"
        onChange={handleInputChange}
        value={ideaAuthor}
      />
    </div>
  );
}
