import { create } from 'zustand';
import type { Project } from '@/app/clorga/page';

interface ProjectStoreState {
  projectsStore: Project[];
  setProjects: (projects: Project[]) => void;
}

export const projectStore = create<ProjectStoreState>((set) => ({
  projectsStore: [],
  setProjects: (projects) => set({ projectsStore: projects }),
}));
