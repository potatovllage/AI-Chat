import { readDB, writeDB } from "../utils/db";
import type { ChatMessage } from "../types/chat";

export const getMessagesByCharacter = (characterId: string) => {
  const db = readDB();
  return db.messages[characterId] || [];
};

export const addMessage = (characterId: string, message: ChatMessage) => {
  const db = readDB();

  if (!db.messages[characterId]) {
    db.messages[characterId] = [];
  }

  db.messages[characterId].push(message);

  writeDB(db);
};
