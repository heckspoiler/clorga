import { create } from 'zustand';

interface FormInViewportStoreType {
  isInViewport: boolean;
  setIsInViewport: (isInViewport: boolean) => void;
  shouldComeBack: boolean;
  setShouldComeBack: (shouldComeBack: boolean) => void;
}

export const forminViewportStore = create<FormInViewportStoreType>((set) => ({
  isInViewport: true,
  setIsInViewport: (isInViewport: boolean) => set({ isInViewport }),
  shouldComeBack: false,
  setShouldComeBack: (shouldComeBack: boolean) => set({ shouldComeBack }),
}));
