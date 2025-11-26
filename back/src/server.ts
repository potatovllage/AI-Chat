import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import authRouter from "./routes/auth";
import characterRouter from "./routes/caracter";
import chatRouter from "./routes/chat";

import { initSystemCharacters } from "./controllers/characterController";
import { readDB, writeDB } from "./utils/db";

const app = express();

app.use(cors());
app.use(express.json({ limit: "5mb" }));

initSystemCharacters();

const db = readDB();
if (!db.messages) {
  db.messages = {};
  writeDB(db);
}

app.use("/auth", authRouter);
app.use("/characters", characterRouter);
app.use("/chat", chatRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});
