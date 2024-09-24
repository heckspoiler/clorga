import React from 'react';

import { login, signup } from '@/app/login/action';

export default function LoginField({ styles }: { styles: any }) {
  return (
    <div className={styles.FormContainer}>
      <div className={styles.TitleContainer}>
        <h1>Clorga</h1>
      </div>
      <form className={styles.Form}>
        <div className={styles.EmailContainer}>
          <label htmlFor="email">Email:</label>
          <input id="email" name="email" type="email" required />
        </div>
        <div className={styles.PasswordContainer}>
          <label htmlFor="password">Password:</label>
          <input id="password" name="password" type="password" required />
        </div>
        <div className={styles.ButtonContainer}>
          <button formAction={login}>Log in</button>
          <button formAction={signup}>Sign up</button>
        </div>
      </form>
    </div>
  );
}
