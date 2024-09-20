import { create } from 'zustand';

interface FormInViewportStoreType {
  isInViewport: boolean;
  setIsInViewport: (isInViewport: boolean) => void;
}

export const forminViewportStore = create<FormInViewportStoreType>((set) => ({
  isInViewport: false,
  setIsInViewport: (isInViewport: boolean) => set({ isInViewport }),
}));
