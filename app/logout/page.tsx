'use client';

import { useEffect } from 'react';
import { logout } from './actions'; // Adjust the import path as needed

export default function LogoutPage() {
  useEffect(() => {
    const performLogout = async () => {
      await logout();
    };

    performLogout();
  }, []);

  return <div>Logging out...</div>;
}
