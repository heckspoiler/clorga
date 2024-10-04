'use client';
import React, { useEffect } from 'react';
import { userStore } from '@/utils/userStore';

export default function ClientDashboard({ user }: { user: any }) {
  const { setUser } = userStore();
  const firstName = userStore((state) => state.firstName);

  const userDetails = {
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    phone: user.phone,
    address: user.address,
  };

  useEffect(() => {
    setUser(userDetails);
  }, []);

  return <h1>{<>{firstName ? firstName : 'you!'}</>}</h1>;
}
