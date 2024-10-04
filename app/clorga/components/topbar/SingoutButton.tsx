import React from 'react';

import { redirectToLogout } from '@/app/logout/actions';

export default function SingoutButton(styles: any) {
  const handleLogout = async () => {
    await redirectToLogout();
  };
  return <button onClick={handleLogout}>Log Out</button>;
}
