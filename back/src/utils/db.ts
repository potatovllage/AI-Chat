import fs from "fs";
import path from "path";
import { ChatMessage } from "../types/chat";

const DB_PATH = path.join(__dirname, "../db/data.json");

interface DBType {
  users: any[];
  characters: any[];
  messages: Record<string, ChatMessage[]>;
}

export const readDB = (): DBType => {
  const raw = fs.readFileSync(DB_PATH, "utf8");
  const json = JSON.parse(raw);

  // messages가 없으면 생성
  if (!json.messages) {
    json.messages = {};
    fs.writeFileSync(DB_PATH, JSON.stringify(json, null, 2));
  }

  return json;
};

export const writeDB = (data: DBType) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};
