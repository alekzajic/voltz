import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  selectedTransformerIds: number[];
  searchQuery: string;
  healthFilter: string;

  toggleTransformerSelection: (id: number) => void;
  setSearchQuery: (query: string) => void;
  setHealthFilter: (filter: string) => void;
}

export const useAppStore = create<AppState>()(
    persist(
        (set) => ({
            selectedTransformerIds: [],
            searchQuery: '',
            healthFilter: 'All',

            toggleTransformerSelection: (id) =>
                set((state) => {
                    const isSelected = state.selectedTransformerIds.includes(id);
                    return {
                        selectedTransformerIds: isSelected
                            ? state.selectedTransformerIds.filter((tId) => tId !== id)
                            : [...state.selectedTransformerIds, id],
                    };
                }),

            setSearchQuery: (query) => set({ searchQuery: query }),
            setHealthFilter: (filter) => set({ healthFilter: filter }),
        }),
        {
            name: 'volt-app-storage',
        }
    )
);
