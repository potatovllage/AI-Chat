import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import authRouter from "./routes/auth";

const app = express();

app.use(cors());
app.use(express.json({ limit: "5mb" }));

app.use("/auth", authRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});
