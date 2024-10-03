'use client';

import { useEffect } from 'react';
import { logout } from './actions'; // Adjust the import path as needed
import styles from './page.module.css';
import Link from 'next/link';
import { CrossIcon } from 'lucide-react';
import Plussign from '../components/general/Plussign';

export default function LogoutPage() {
  useEffect(() => {
    const performLogout = async () => {
      await logout();
    };

    performLogout();
  }, []);

  return (
    <div className={styles.logoutContainer}>
      <div className={styles.messageBox}>
        <div className={styles.Container}>
          <p className={styles.message}>You've been logged out.</p>
          <Link href="/" className={styles.homeLink}>
            Go back to homepage
          </Link>
        </div>
        <div className={styles.Container}>
          <Plussign width={'40'} height={'40'} strokeWidth={'2'} />
        </div>
      </div>
    </div>
  );
}
