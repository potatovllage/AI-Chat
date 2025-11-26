import { create } from "zustand";
import type { CharacterState } from "../types/storeType";

export const useCharacterStore = create<CharacterState>((set) => ({
  activeCharacterId: null,

  setActiveCharacterId: (id) => set({ activeCharacterId: id }),

  resetCharacter: () => set({ activeCharacterId: null }),
}));
