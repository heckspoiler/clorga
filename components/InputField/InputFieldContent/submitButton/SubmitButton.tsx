import React from 'react';

interface SubmitButtonProps {
  styles: any;
}

export default function SubmitButton({ styles }: { styles: any }) {
  return (
    <>
      <button className={styles.Submit}>Submit</button>
    </>
  );
}
