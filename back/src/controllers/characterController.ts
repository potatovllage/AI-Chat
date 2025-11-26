import fs from "fs";
import path from "path";
import { Request, Response } from "express";
import { defaultCharacters } from "../constants/defaultCaracters";

const DB_PATH = path.join(__dirname, "../db/data.json");

const readDB = () => JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
const writeDB = (data: any) =>
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

export const initSystemCharacters = () => {
  const db = readDB();

  const hasSystem = db.characters.some((c: any) => c.owner === "system");
  if (!hasSystem) {
    db.characters.push(...defaultCharacters);
    writeDB(db);
  }
};
export const getCharacters = (req: Request & { user?: any }, res: Response) => {
  const db = readDB();
  const userId = req.user.id;

  const characters = db.characters.filter(
    (c: any) => c.owner === "system" || c.owner === userId
  );

  return res.json({ characters });
};

export const createCharacter = (
  req: Request & { user?: any },
  res: Response
) => {
  const { name, description, prompt, thumbnail } = req.body;
  const db = readDB();

  if (!name || !description || !prompt || !thumbnail) {
    return res.status(400).json({ message: "필수 값이 없습니다." });
  }

  const newCharacter = {
    id: Date.now().toString(),
    name,
    description,
    prompt,
    thumbnail,
    owner: req.user.id,
  };

  db.characters.push(newCharacter);
  writeDB(db);

  return res.json({ message: "캐릭터 생성 완료", character: newCharacter });
};

export const deleteCharacter = (
  req: Request & { user?: any },
  res: Response
) => {
  const characterId = req.params.id;
  const db = readDB();

  const character = db.characters.find((c: any) => c.id === characterId);

  if (!character) {
    return res.status(404).json({ message: "캐릭터를 찾을 수 없습니다." });
  }

  if (character.owner !== req.user.id) {
    return res.status(403).json({ message: "권한이 없습니다." });
  }

  db.characters = db.characters.filter((c: any) => c.id !== characterId);
  writeDB(db);

  return res.json({ message: "캐릭터 삭제 완료" });
};
