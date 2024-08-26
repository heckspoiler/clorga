'use client';

import React, { useState, useEffect } from 'react';
import { formStore } from '../../../../utils/formstore';
import AddTagField from './AddTagField';
import { Project } from '../../../../app/page';

export default function TagField({
  styles,
  selectedProject,
  projects,
}: {
  styles: any;
  selectedProject: string;
  projects: Project[];
}) {
  const [newTag, setNewTag] = useState('');
  const [submitTagWindowIsOpen, setSubmitTagWindowIsOpen] = useState(false);
  const [activeTags, setActiveTags] = useState(new Set<string>());
  const [renderedTags, setRenderedTags] = useState<JSX.Element[]>([]);

  const toggleTag = (tag: string) => {
    setActiveTags((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(tag)) {
        newSet.delete(tag);
      } else {
        newSet.add(tag);
      }
      return newSet;
    });
  };

  console.log(projects);

  useEffect(() => {
    const selectedProjectTags =
      projects.find((project) => project.project_name == selectedProject)
        ?.project_tags || [];

    const newRenderedTags = selectedProjectTags.map(
      (tag: string, index: number) => (
        <p
          className={`${styles.Tag} ${
            activeTags.has(tag.toLowerCase()) ? styles.TagClicked : ''
          }`}
          key={index}
          data-value={`${tag.toLowerCase()}`}
          data-clickable="true"
          onClick={() => toggleTag(tag.toLowerCase())}
        >
          {`${tag.toLowerCase()}`}
        </p>
      )
    );

    setRenderedTags(newRenderedTags);
  }, [selectedProject]);

  return (
    <div className={styles.TagsContainer}>
      <div className={styles.FormCell}>
        <label htmlFor="tags">Tags:</label>
        <div className={styles.Tags}>
          <div
            className={styles.AddTag}
            onClick={() => setSubmitTagWindowIsOpen(!submitTagWindowIsOpen)}
          >
            {submitTagWindowIsOpen ? 'close' : 'new tag'}
          </div>
          {renderedTags}
        </div>
      </div>
      {submitTagWindowIsOpen && (
        <div className={`${styles.SubmitField} ${styles.SubmitFieldVisible}`}>
          <AddTagField
            state={submitTagWindowIsOpen}
            setState={setSubmitTagWindowIsOpen}
            styles={styles}
            newTag={newTag}
            setNewTag={setNewTag}
            allTagsStore={[]}
            setAllTags={function (value: any): void {
              throw new Error('Function not implemented.');
            }}
          />
        </div>
      )}
    </div>
  );
}
