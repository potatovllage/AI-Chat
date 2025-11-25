import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ message: "토큰 없음" });

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "토큰이 유효하지 않습니다." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded; // 로그인된 사용자 정보 저장
    next();
  } catch (e) {
    return res.status(401).json({ message: "토큰이 유효하지 않습니다." });
  }
};
