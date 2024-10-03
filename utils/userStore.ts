import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserStoreType = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  setUser: (user: Partial<UserStoreType>) => void;
};

export const userStore = create<UserStoreType>()(
  persist(
    (set) => ({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      setUser: (user) => set((state) => ({ ...state, ...user })),
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
      }),
    }
  )
);
