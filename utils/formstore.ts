import { create } from 'zustand';

interface FormStore {
  allTagsStore: string[];
  projectsStore: string;
  setAllTags: (tagsStore: string) => void;
  setProjects: (projectsStore: string) => void;
  removeAllTags: () => void;
  removeProjects: () => void;
}

export const formStore = create((set) => ({
  allTagsStore: [] as string[],
  setAllTags: (tags: string[]) => set({ allTagsStore: tags }),
  projectsStore: '' as string,
  setProjects: (projectsStore: string) => set({ projectsStore }),
  removeAllTags: () => set({ tagsStore: [] }),
  removeProjects: () => set({ projectsStore: '' }),
}));
