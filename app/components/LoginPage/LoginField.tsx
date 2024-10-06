'use client';

import React from 'react';
import { login } from '@/app/login/actions';
import Plussign from '../general/Plussign';
import Link from 'next/link';
import AuthButtons from '../SignupPage/MultistepForm/AuthButtons';

export default function LoginField({ styles }: { styles: any }) {
  return (
    <div className={styles.FormContainer}>
      <div className={styles.TitleContainer}>
        <div className={styles.Title}>
          <h2>Clorga</h2>
          <p>
            organize your <span>creativity</span>
          </p>
        </div>
      </div>
      <form action={login} className={styles.Form}>
        <h3>Enter your credentials </h3>
        <div className={styles.EmailContainer}>
          <label htmlFor="email">Email:</label>
          <input id="email" name="email" type="email" required />
        </div>
        <div className={styles.PasswordContainer}>
          <label htmlFor="password">Password:</label>
          <input id="password" name="password" type="password" required />
        </div>
        <div className={styles.ButtonContainer}>
          <div className={styles.Buttons}>
            <button type="submit">Log in</button>
          </div>
          <div className={styles.ForgotPassword}>
            <Link href="/forgot-password">Forgot Password...?</Link>
          </div>
          <p className={styles.OrUse}>or use</p>
          <div className={styles.AuthButtonContainer}>
            <AuthButtons
              width={45}
              height={45}
              className={styles.AuthButtons}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
