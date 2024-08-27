import { create } from 'zustand';

// Type definitions
type ProjectIdea = {
  id: number;
  idea: string;
  description: string;
  tags: string[];
  title: string;
  created_at: Date | string;
};

type ProjectStore = {
  // Project-level properties
  newProject: boolean;
  projectName: string;
  projectTimestamp: Date | string;
  projectTags: string[];
  projectDueDate: Date | string;
  projectIdeas: ProjectIdea[];

  // Project-level setters
  setNewProject: (newProject: boolean) => void;
  setProjectName: (projectName: string) => void;
  setProjectTimestamp: (projectTimestamp: Date | string) => void;
  setProjectTags: (projectTags: string[]) => void;
  setProjectDueDate: (projectDueDate: Date | string) => void;
  setProjectIdeas: (projectIdeas: ProjectIdea[]) => void;

  // Idea-level properties
  ideaTitle: string;
  ideaDescription: string;
  ideaAuthor: string;

  // Idea-level setters
  setIdeaTitle: (ideaTitle: string) => void;
  setIdeaDescription: (ideaDescription: string) => void;
  setIdeaAuthor: (ideaAuthor: string) => void;
};

// Store creation
export const newProjectStore = create<ProjectStore>((set) => ({
  // Project-level properties
  newProject: false,
  projectName: '',
  projectTimestamp: '',
  projectTags: [],
  projectDueDate: '',
  projectIdeas: [],

  // Project-level setters
  setNewProject: (newProject: boolean) => set({ newProject }),
  setProjectName: (projectName: string) => set({ projectName }),
  setProjectTimestamp: (projectTimestamp: Date | string) =>
    set({ projectTimestamp }),
  setProjectTags: (projectTags: string[]) => set({ projectTags }),
  setProjectDueDate: (projectDueDate: Date | string) => set({ projectDueDate }),
  setProjectIdeas: (projectIdeas: ProjectIdea[]) => set({ projectIdeas }),

  // Idea-level properties
  ideaTitle: '',
  ideaDescription: '',
  ideaAuthor: '',

  // Idea-level setters
  setIdeaTitle: (ideaTitle: string) => set({ ideaTitle }),
  setIdeaDescription: (ideaDescription: string) => set({ ideaDescription }),
  setIdeaAuthor: (ideaAuthor: string) => set({ ideaAuthor }),
}));
