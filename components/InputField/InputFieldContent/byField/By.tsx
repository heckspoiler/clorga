import React from 'react';

export default function By({ styles }: { styles: any }) {
  return (
    <div className={styles.FormCell}>
      <label htmlFor="name">By:</label>
      <input
        id="name"
        type="text"
        placeholder="Enter Name"
        data-clickable="true"
      />
    </div>
  );
}
