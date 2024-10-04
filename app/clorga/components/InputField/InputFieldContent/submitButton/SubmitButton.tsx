'use client';

import React, { useEffect, useState } from 'react';
import { newProjectStore } from '@/utils/newProjectStore';
import { isSubmittedStore } from '@/utils/isSubmittedStore';
import { IsSubmittedStoreType } from '@/utils/isSubmittedStore';
import { handleProjectSubmit } from '@/utils/helpers/handleFormSubmit';
import { userStore } from '@/utils/userStore';

export default function SubmitButton({ styles }: { styles: any }) {
  const {
    projectName,
    projectTags,
    projectDueDate,
    ideaTitle,
    ideaAuthor,
    ideaDescription,
    selectedTagsForIdea,
    setIdeaAuthor,
  } = newProjectStore();

  const name = userStore((state) => state.firstName) as string;

  const { isSubmitted, setIsSubmitted } =
    isSubmittedStore() as IsSubmittedStoreType;
  const [userName, setUserName] = useState('');

  useEffect(() => {
    setIdeaAuthor(name);
  }, [name]);

  useEffect(() => {
    setIsSubmitted(false);
  }, [
    projectName,
    projectTags,
    projectDueDate,
    ideaTitle,
    ideaAuthor,
    ideaDescription,
    selectedTagsForIdea,
  ]);

  const handleSubmit = async (event: React.MouseEvent) => {
    event.preventDefault();

    if (isSubmitted) {
      return;
    }

    try {
      await handleProjectSubmit({
        projectName,
        projectTags,
        projectDueDate,
        ideaTitle,
        ideaAuthor,
        ideaDescription,
        selectedTagsForIdea,
        setIsSubmitted,
      });
    } catch (error) {
      console.error('Error submitting project:', error);
    }
  };

  return (
    <button className={styles.Submit} onClick={handleSubmit}>
      Submit
    </button>
  );
}
