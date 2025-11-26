import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  getCharacters,
  createCharacter,
  deleteCharacter,
} from "../controllers/characterController";

const router = Router();

router.get("/", authMiddleware, getCharacters);
router.post("/", authMiddleware, createCharacter);
router.delete("/:id", authMiddleware, deleteCharacter);

export default router;
