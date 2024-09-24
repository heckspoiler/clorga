'use client';

import React, { useCallback, useRef } from 'react';

// helper imports
import { wiggleElement } from '@/utils/helpers/wiggleAnimation';
import { handleInputChange } from '@/utils/helpers/handleInputChange';

export default function AddTagField({
  state,
  setState,
  styles,
  projectTags,
  setProjectTags,
  allTagsStore,
  setAllTags,
  newTag,
  setNewTag,
  tagName,
  setTagName,
  tagsMappingArray,
  setTagsMappingArray,
  selectedTags,
  setSelectedTags,
  selectedTagsForIdea,
  setSelectedTagsForIdea,
}: {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  styles: any;
  projectTags: string[];
  setProjectTags: (projectTags: string[]) => void;
  allTagsStore: string[];
  setAllTags: React.Dispatch<React.SetStateAction<string[]>>;
  newTag: boolean;
  setNewTag: (newTag: boolean) => void;
  tagName: string;
  setTagName: (tagName: string) => void;
  tagsMappingArray: string[] | null;
  setTagsMappingArray: (tagsMappingArray: string[]) => void;
  selectedTags: Set<string>;
  setSelectedTags: React.Dispatch<React.SetStateAction<Set<string>>>;
  selectedTagsForIdea: Set<string>;
  setSelectedTagsForIdea: (selectedTagsForIdea: Set<string>) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const addNewTag = useCallback(() => {
    if (newTag && !allTagsStore.includes(tagName)) {
      allTagsStore.push(tagName);
      setProjectTags([...projectTags, tagName]);
      if (tagsMappingArray) {
        tagsMappingArray.push(tagName);
      }
      setTagName('');
      setState(false);
      setNewTag(!newTag);
    }
  }, [newTag, allTagsStore, projectTags, setAllTags, setProjectTags, setState]);

  const handleSubmit = (event: React.MouseEvent<HTMLDivElement>) => {
    if (inputRef.current && inputRef.current.value === '') {
      event.preventDefault();
      wiggleElement(inputRef.current);
      return;
    }

    if (
      newTag &&
      !allTagsStore.includes(tagName) &&
      inputRef.current &&
      inputRef.current.value !== ''
    ) {
      setSelectedTags(new Set([...selectedTags, tagName]));
      setSelectedTagsForIdea(new Set([...selectedTagsForIdea, tagName]));
      console.log(selectedTagsForIdea);
      addNewTag();
      setState(!state);
    }
  };

  return (
    <div className={styles.InputTag}>
      <input
        value={tagName}
        onChange={(e) => handleInputChange(e, setTagName)}
        placeholder="Enter new tag"
        ref={inputRef}
      />
      <div onClick={handleSubmit} className={styles.SubmitButton}>
        <p>add tag</p>
      </div>
    </div>
  );
}
