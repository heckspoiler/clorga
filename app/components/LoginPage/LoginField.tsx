'use client';

import React from 'react';

import { login, signup } from '@/app/login/action';

import Plussign from '../general/Plussign';

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
        <div className={styles.Logo}>
          <Plussign height={'50'} width={'50'} fill={'transparent'} />
        </div>
      </div>
      <form className={styles.Form}>
        <h3>Enter your credentials: </h3>
        <div className={styles.EmailContainer}>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="ligma_balls@company.xyz"
          />
        </div>
        <div className={styles.PasswordContainer}>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="***********"
            required
          />
        </div>
        <div className={styles.ButtonContainer}>
          <div className={styles.Buttons}>
            <button formAction={login}>Log in</button>
            <button formAction={signup}>Sign up</button>
          </div>
          <div className={styles.ForgotPassword}>
            <a>Forgot Password...?</a>
          </div>
        </div>
      </form>
    </div>
  );
}
