import { create } from 'zustand';

export const projectStore = create((set) => ({
  projectsStore: [],
  setProjects: (projects: string[]) => set({ projectsStore: projects }),
}));
