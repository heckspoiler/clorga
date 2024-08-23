import { create } from 'zustand';

const formStore = create((set) => ({
  tags: [],
  projects: '',
  setTags: (tags: string) => set({ tags }),
  setProjects: (projects: string) => set({ projects }),
}));
