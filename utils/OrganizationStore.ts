import { create } from 'zustand';

interface OrganizationState {
  organizationId: string | null;
  setOrganizationId: (id: string) => void;
}

export const useOrganizationStore = create<OrganizationState>((set) => ({
  organizationId: null,
  setOrganizationId: (id) => set({ organizationId: id }),
}));
