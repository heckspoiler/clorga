'use client';

import React, { useEffect, useRef } from 'react';
import { newProjectStore } from '@/utils/newProjectStore';
import { isSubmittedStore } from '@/utils/isSubmittedStore';
import { handleInputChange } from '@/utils/helpers/handleInputChange';

export default function By({ styles }: { styles: any }) {
  //zustand store
  const { ideaAuthor, setIdeaAuthor } = newProjectStore();
  const { isSubmitted, setIsSubmitted } = isSubmittedStore();

  useEffect(() => {
    if (isSubmitted) {
      setIdeaAuthor('');
    }
  }, [isSubmitted, setIdeaAuthor]);

  return (
    <div className={styles.FormCell}>
      <label htmlFor="name">By:</label>
      <input
        id="name"
        type="text"
        placeholder="Enter Name"
        data-clickable="true"
        onChange={(e) => handleInputChange(e, setIdeaAuthor)}
        value={ideaAuthor}
      />
    </div>
  );
}
