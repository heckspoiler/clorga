'use client';

import React, { useCallback, useEffect, useRef } from 'react';

import PlusSign from '@/public/svg/plussign.svg';

import { gsap } from 'gsap';

import { useGSAP } from '@gsap/react';

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
  tagsMappingArray: string[];
  setTagsMappingArray: (tagsMappingArray: string[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const wiggle = useCallback(() => {
    if (inputRef.current) {
      gsap.to(inputRef.current, {
        keyframes: [
          {
            x: 3,
            y: -2,
            rotation: -1,
            scale: 1.02,
            backgroundColor: 'rgba(255, 255, 200, 0.5)',
            duration: 0.1,
          },
          {
            x: -3,
            y: 2,
            rotation: 1,
            scale: 1.02,
            backgroundColor: 'rgba(255, 255, 200, 0.5)',
            duration: 0.1,
          },
          {
            x: 3,
            y: -1,
            rotation: -0.5,
            scale: 1.01,
            backgroundColor: 'rgba(255, 255, 200, 0.3)',
            duration: 0.1,
          },
          {
            x: -3,
            y: 1,
            rotation: 0.5,
            scale: 1.01,
            backgroundColor: 'rgba(255, 255, 200, 0.3)',
            duration: 0.1,
          },
          {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            backgroundColor: 'transparent',
            duration: 0.1,
          },
        ],
        ease: 'power2.inOut',
      });
    }
  }, []);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagName(event.target.value);
  };

  useEffect(() => {
    console.log('tagName', tagName);
  }, [tagName]);

  const addNewTag = useCallback(() => {
    if (newTag && !allTagsStore.includes(tagName)) {
      allTagsStore.push(tagName);
      tagsMappingArray.push(tagName);
      setTagName('');
      setState(false);
    }
  }, [newTag, allTagsStore, setAllTags, setProjectTags, setState]);

  const handleSubmit = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    addNewTag();
    setState(!state);
  };

  return (
    <>
      <input
        value={tagName}
        onChange={handleInputChange}
        placeholder="Enter new tag"
        ref={inputRef}
      />
      <div onClick={handleSubmit} className={styles.SubmitButton}>
        <p>add tag</p>
      </div>
    </>
  );
}
