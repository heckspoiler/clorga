'use client';

import React, { useEffect } from 'react';

import { newProjectStore } from '@/utils/newProjectStore';
import { isSubmittedStore } from '@/utils/isSubmittedStore';

export default function DateField({
  styles,
  newProject,
}: {
  styles: any;
  newProject: boolean;
}) {
  //zustand store
  const { projectDueDate, setProjectDueDate } = newProjectStore();
  const { isSubmitted } = isSubmittedStore();

  useEffect(() => {
    if (isSubmitted) {
      setProjectDueDate('');
    }
  }, [isSubmitted, setProjectDueDate]);

  // handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectDueDate(e.target.value);
  };

  return (
    <div
      className={`${styles.FormCellDate} ${
        newProject ? styles.DateFieldIsVisible : ''
      }`}
    >
      <label htmlFor="idea-title">Date Due (optional):</label>
      <input
        id="idea-title"
        type="date"
        data-clickable="true"
        onChange={handleInputChange}
        value={projectDueDate.toString()}
      />
    </div>
  );
}
