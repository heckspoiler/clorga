'use client';

import React, { useState, useEffect } from 'react';
import { newProjectStore } from '@/utils/newProjectStore';
import AddTagField from './AddTagField';
import Plussign from '@/components/general/Plussign';
import { Project } from '@/app/page';

import { formStore } from '@/utils/formstore';

export default function TagField({
  styles,
  projects,
  selectedProject,
}: {
  styles: any;
  projects: Project[];
  selectedProject: string;
}) {
  // zustand stores

  const { projectTags, setProjectTags } = newProjectStore();
  const { newTag, setNewTag } = newProjectStore();
  const { tagName, setTagName } = newProjectStore();

  // useStates
  const [submitTagWindowIsOpen, setSubmitTagWindowIsOpen] = useState(false);
  const [tagsMappingArray, setTagsMappingArray] =
    useState<string[]>(projectTags);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  useEffect(() => {
    const selectedProjectTags =
      projects.find(
        (project) =>
          project.project_name?.toLowerCase() === selectedProject.toLowerCase()
      )?.project_tags || [];
    setTagsMappingArray(selectedProjectTags.map((tag) => tag.toLowerCase()));
  }, [selectedProject, projects]);

  // setting active State for tags that are being selected
  const handleTagClick = (tag: string) => {
    setSelectedTags((prevSelectedTags) => {
      const newSelectedTags = new Set(prevSelectedTags);
      if (newSelectedTags.has(tag)) {
        newSelectedTags.delete(tag);
      } else {
        newSelectedTags.add(tag);
      }
      return newSelectedTags;
    });
  };

  return (
    <div className={styles.TagsContainer}>
      <div className={styles.FormCell}>
        <label htmlFor="tags">Tags:</label>
        <div className={styles.Tags}>
          <div
            className={styles.AddTag}
            onClick={() => {
              setSubmitTagWindowIsOpen(!submitTagWindowIsOpen);
              setNewTag(!newTag);
            }}
          >
            <p>{submitTagWindowIsOpen ? 'close' : 'new tag'}</p>
            <div className={styles.SvgContainer}>
              <Plussign height={'15px'} width={'15px'} />
            </div>
          </div>
          {tagsMappingArray.map((tag, index) => (
            <div
              className={`${styles.Tag} ${
                selectedTags.has(tag) ? styles.TagClicked : ''
              }`}
              key={index}
              data-value={tag}
              data-clickable="true"
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.Legend}>
        <div className={styles.LegendRow}>
          <div></div>
          <p>not selected</p>
        </div>
        <div className={styles.LegendRow}>
          <div></div>
          <p>selected</p>
        </div>
      </div>
      <div
        className={`${styles.SubmitField} ${
          submitTagWindowIsOpen ? styles.SubmitFieldVisible : ''
        }`}
      >
        <AddTagField
          state={submitTagWindowIsOpen}
          setState={setSubmitTagWindowIsOpen}
          styles={styles}
          projectTags={projectTags}
          setProjectTags={setProjectTags}
          newTag={newTag}
          setNewTag={setNewTag}
          tagName={tagName}
          setTagName={setTagName}
          tagsMappingArray={tagsMappingArray}
          setTagsMappingArray={setTagsMappingArray}
          allTagsStore={[]}
          setAllTags={function (value: React.SetStateAction<string[]>): void {
            throw new Error('Function not implemented.');
          }}
        />
      </div>
    </div>
  );
}
