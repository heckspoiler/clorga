import { create } from 'zustand';

export const formStore = create((set) => ({
  allTagsStore: [] as string[],
  projectsStore: '' as string,
  setAllTags: (tagsStore: string) => set({ tagsStore }),
  setProjects: (projectsStore: string) => set({ projectsStore }),
  removeAllTags: () => set({ tagsStore: [] }),
  removeProjects: () => set({ projectsStore: '' }),
}));
