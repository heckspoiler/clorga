import React from 'react';

import { signup } from '@/app/signup/actions';

import Plussign from '../general/Plussign';
import Multistep from './MultistepForm/Multistep';

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
        <div className={styles.Logo}>
          <Plussign height={'50'} width={'50'} fill={'transparent'} />
        </div>
      </div>
      <div className={styles.FormContainer}>
        <Multistep />
      </div>
    </>
  );
}
