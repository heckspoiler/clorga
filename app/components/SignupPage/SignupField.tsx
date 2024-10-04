import React from 'react';

import { signup } from '@/app/signup/actions';

import Plussign from '../general/Plussign';
import SignUpFieldContent from './SignUpFieldContent/SignUpFieldContent';
import SignUpForm from './MultistepForm/Multistep';

export default function SignupField({ styles }: { styles: any }) {
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
      <div className={styles.FormContainer}>
        <SignUpForm />
      </div>
    </>
  );
}
