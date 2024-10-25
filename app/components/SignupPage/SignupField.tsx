import React from 'react';

import styles from './SignupPage.module.css';
import SignUpForm from './MultistepForm/SignupForm';

export default function SignupField({
  title,
  email,
  token,
  organizationName,
}: {
  title?: string;
  email?: string;
  token?: string;
  organizationName?: string;
}) {
  return (
    <>
      <div className={styles.TitleContainer}>
        <div className={styles.Title}>
          <h2>Clorga</h2>
          <p>
            organize your <span>creativity</span>
          </p>
        </div>
      </div>
      <div className={styles.FormContainer} title={title}>
        <SignUpForm
          email={email}
          title={title}
          token={token}
          organizationName={organizationName}
        />
      </div>
    </>
  );
}
