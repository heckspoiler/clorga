import { create } from 'zustand';

type ProjectIdea = {
  id: number;
  idea: string;
  description: string;
  tags: string[];
  title: string;
  created_at: Date | string;
};

type ProjectStore = {
  newProject: boolean;
  setNewProject: (newProject: boolean) => void;
  projectName: string;
  setProjectName: (projectCreated: string) => void;
  projectTimestamp: Date | string;
  setProjectTimestamp: (projectTimestamp: Date | string) => void;
  newProjectsName: string[];
  setNewProjectName: (projectName: string) => void;
  projectTags: string[];
  setProjectTags: (projectTags: string[]) => void;
  projectDueDate: Date | string;
  setProjectDueDate: (projectDueDate: Date | string) => void;
  setProjectIdeas: (projectIdeas: ProjectIdea[]) => void;
  projectIdeas: ProjectIdea[];
};

export const newProjectStore = create<ProjectStore>((set) => ({
  newProject: false,
  setNewProject: (newProject: boolean) => set({ newProject }),
  projectName: '',
  setProjectName: (projectName: string) => set({ projectName }),
  projectTimestamp: '',
  setProjectTimestamp: (projectTimestamp: Date | string) =>
    set({ projectTimestamp }),
  newProjectsName: [],
  setNewProjectName: (projectName: string) =>
    set((state) => ({
      newProjectsName: [...state.newProjectsName, projectName],
    })),
  projectTags: [],
  setProjectTags: (projectTags: string[]) => set({ projectTags }),
  projectIdeas: [],
  setProjectIdeas: (projectIdeas: ProjectIdea[]) => set({ projectIdeas }),
  projectDueDate: '',
  setProjectDueDate: (projectDueDate: Date | string) => set({ projectDueDate }),
}));
