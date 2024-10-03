'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';

// Define the shape of your user data
interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}

// Create a context for the user
const UserContext = createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}>({
  user: null,
  setUser: () => {},
});

// Custom hook to use UserContext easily
export const useUser = () => useContext(UserContext);

// Create a UserProvider component
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
