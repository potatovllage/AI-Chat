import { readDB } from "../utils/db";

export const getCharacterById = (id: string) => {
  const db = readDB();
  return db.characters.find((c) => c.id === id);
};
