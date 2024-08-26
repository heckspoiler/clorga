'use client';

import React, { useEffect } from 'react';

export default function AddTagField({
  state,
  setState,
  styles,
  newTag,
  setNewTag,
  tagIsSubmitted,
  setTagIsSubmitted,
}: {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  styles: any;
  newTag: string;
  setNewTag: React.Dispatch<React.SetStateAction<string>>;
  tagIsSubmitted: boolean;
  setTagIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(event.target.value);
  };

  useEffect(() => {
    console.log(newTag);
    console.log(tagIsSubmitted);
  }, [newTag, tagIsSubmitted]);

  return (
    <>
      <input
        value={newTag}
        onChange={handleInputChange}
        placeholder="Enter new tag"
      />
      <div
        onClick={() => {
          setState(!state);
          setTagIsSubmitted(!tagIsSubmitted);
        }}
      >
        add tag
      </div>
    </>
  );
}
