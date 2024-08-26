import { create } from 'zustand';

export const projectStore = create((set) => ({
  projectsStore: [] as string[],
  setProjects: (projects: string[]) => set({ projectsStore: projects }),
}));
