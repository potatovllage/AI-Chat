import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

const router = Router();

const DB_PATH = path.join(__dirname, "../db/data.json");

const readDB = () => JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
const writeDB = (data: any) =>
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const db = readDB();

  // 이메일 중복 체크
  const exists = db.users.find((u: any) => u.email === email);
  if (exists) {
    return res.status(400).json({ message: "이미 가입된 이메일입니다." });
  }

  // 비밀번호 해싱
  const hashedPw = await bcrypt.hash(password, 10);

  // 유저 생성
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password: hashedPw,
  };

  db.users.push(newUser);
  writeDB(db);

  return res.json({ message: "회원가입 성공" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const db = readDB();

  const user = db.users.find((u: any) => u.email === email);
  if (!user)
    return res.status(400).json({ message: "존재하지 않는 계정입니다." });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(400).json({ message: "비밀번호가 일치하지 않습니다." });

  // JWT 발급
  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    process.env.JWT_SECRET as string,
    { expiresIn: process.env.JWT_EXPIRES_IN } as jwt.SignOptions
  );

  return res.json({
    message: "로그인 성공",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

export default router;
