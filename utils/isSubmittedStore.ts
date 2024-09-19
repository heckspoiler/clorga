import { create } from 'zustand';

export type IsSubmittedStoreType = {
  isSubmitted: boolean;
  setIsSubmitted: (value: boolean) => void;
};

export const isSubmittedStore = create<IsSubmittedStoreType>((set) => ({
  isSubmitted: false,
  setIsSubmitted: (isSubmitted: boolean) => set({ isSubmitted }),
}));
