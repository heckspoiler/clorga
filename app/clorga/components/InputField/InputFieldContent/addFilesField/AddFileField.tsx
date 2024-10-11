'use client';
import React, { useState } from 'react';

import styles from './AddFileField.module.css';
import CellContainer from '../../CellContainer/CellContainer';

import { uploadFile } from '@/utils/supabase/fileUploader';

export default function AddFileField() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      setUploadStatus('Uploading...');
      try {
        const filePath = `uploads/${file.name}`;
        await uploadFile(file, filePath);
        setUploadStatus('Upload successful!');
      } catch (error) {
        console.error('Error uploading file:', error);
        setUploadStatus('Upload failed.');
      }
    }
  };

  return (
    <CellContainer>
      <label>Upload File:</label>
      <div className={styles.UploadContainer}>
        {/* Hidden file input */}
        <input
          type="file"
          id="file-upload"
          className={styles.fileInput}
          onChange={handleFileChange}
        />

        {/* Custom button to open file input */}
        <label htmlFor="file-upload" className={styles.CustomButton}>
          Choose File
        </label>

        {/* Display selected file name and upload status */}
        <span className={styles.fileName}>{file && file.name}</span>
        <p>{uploadStatus}</p>
        <button onClick={handleUpload} className={styles.SubmitButton}>
          Upload
        </button>
      </div>
    </CellContainer>
  );
}
