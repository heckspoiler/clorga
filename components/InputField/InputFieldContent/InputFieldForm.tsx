'use client';

import React, { useState, useEffect } from 'react';
import styles from './InputFieldForm.module.css';
import creativeProjectTags from './tagsArray';
import randomProjectArray from './projectArray';
import TagField from './tagfield/TagField';
import ProjectField from './projectfield/ProjectField';

export type Idea = {
  id: number;
  created_at: string;
  project_name: string;
  idea_title: string;
  idea_description: string;
  tags: string[];
};

export default function InputFieldForm({ ideas }: { ideas: Idea[] }) {
  return (
    <form className={styles.Form}>
      <div className={styles.FormContainer}>
        <div className={styles.FormCell}>
          <label htmlFor="idea">Idea:</label>
          <input id="idea" type="text" placeholder="Enter Idea" />
        </div>
        <div className={styles.FormCell}>
          <label htmlFor="name">By:</label>
          <input id="name" type="text" placeholder="Enter Name" />
        </div>
        <TagField styles={styles} ideas={ideas} />
        <ProjectField styles={styles} ideas={ideas} />
        <button className={styles.Submit}>Submit</button>
      </div>
    </form>
  );
}
