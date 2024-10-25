import React from 'react';
import styles from './Multistep.module.css';

type FormWrapperProps = {
  title: string | null | undefined;
  children: React.ReactNode;
};

export default function Formwrapper({ title, children }: FormWrapperProps) {
  return (
    <>
      <h2>{title}</h2>
      <div className={styles.Container}>{children}</div>
    </>
  );
}
