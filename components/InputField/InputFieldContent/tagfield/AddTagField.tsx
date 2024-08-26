'use client';

import React, { useCallback } from 'react';

export default function AddTagField({
  state,
  setState,
  styles,
  newTag,
  setNewTag,
  allTagsStore,
  setAllTags,
}: {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  styles: any;
  newTag: string;
  setNewTag: React.Dispatch<React.SetStateAction<string>>;
  allTagsStore: string[];
  setAllTags: React.Dispatch<React.SetStateAction<any>>;
}) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(event.target.value);
  };

  const addNewTag = useCallback(() => {
    console.log('Current allTagsStore:', allTagsStore);
    console.log('New tag:', newTag);
    if (newTag && !allTagsStore.includes(newTag)) {
      allTagsStore.push(newTag);
      console.log('Updated allTagsStore:', [...allTagsStore, newTag]);
      setNewTag('');
      setState(false);
    }
  }, [newTag, allTagsStore, setAllTags, setNewTag, setState]);

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addNewTag();
    setState(!state);
  };

  return (
    <>
      <input
        value={newTag}
        onChange={handleInputChange}
        placeholder="Enter new tag"
      />
      <button onClick={handleSubmit} className={styles.SubmitButton}>
        add tag
      </button>
    </>
  );
}
