export interface CharacterState {
  activeCharacterId: string | null;
  setActiveCharacterId: (id: string | null) => void;
  resetCharacter: () => void;
}
