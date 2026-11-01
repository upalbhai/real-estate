import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoriteState {
  favorites: string[]; // Property IDs
  toggleFavorite: (propertyId: string) => void;
  isFavorite: (propertyId: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: ["1", "4"], // Default initial favorites for demo
      toggleFavorite: (propertyId: string) => {
        const { favorites } = get();
        if (favorites.includes(propertyId)) {
          set({ favorites: favorites.filter((id) => id !== propertyId) });
        } else {
          set({ favorites: [...favorites, propertyId] });
        }
      },
      isFavorite: (propertyId: string) => {
        return get().favorites.includes(propertyId);
      },
      clearFavorites: () => {
        set({ favorites: [] });
      },
    }),
    {
      name: "aura-saved-properties",
    }
  )
);

