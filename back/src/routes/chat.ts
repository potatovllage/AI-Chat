import { Router } from "express";

import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources";
import type { ChatMessage } from "../types/chat";
import { authMiddleware } from "../middleware/authMiddleware";
import { getCharacterById } from "../services/characterServices";
import { addMessage, getMessagesByCharacter } from "../services/chatServices";

const router = Router();

// OpenAI 클라이언트
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

/**
 * POST /chat/send
 * 유저 메시지를 받고 → OpenAI 호출 → 응답 저장 → 반환
 */
router.post("/send", authMiddleware, async (req, res) => {
  const { characterId, message } = req.body;

  if (!characterId || !message) {
    return res.status(400).json({
      message: "characterId와 message는 필수 값입니다.",
    });
  }

  try {
    // 1) 캐릭터 찾기
    const character = getCharacterById(characterId);
    if (!character) {
      return res.status(404).json({ message: "캐릭터를 찾을 수 없습니다." });
    }

    // 2) 기존 대화 내역 불러오기
    const previousMessages: ChatMessage[] =
      getMessagesByCharacter(characterId) || [];

    // 3) 유저 메시지 저장 (role literal type 명시)
    const userMsg: ChatMessage = {
      role: "user",
      content: message,
      timestamp: Date.now(),
    };
    addMessage(characterId, userMsg);

    // 4) OpenAI API에 보낼 메시지 포맷 맞추기
    const formattedMessages: ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: character.prompt,
      },

      // 기존 대화 (assistant/user)만 변환
      ...previousMessages.map((m) => ({
        role: m.role, // "user" | "assistant"
        content: m.content,
      })),

      // 새 유저 메시지
      {
        role: "user",
        content: message,
      },
    ];

    // 5) GPT 호출
    const completion = await client.chat.completions.create({
      model: "gpt-4.1-nano",
      messages: formattedMessages,
    });

    const aiText =
      completion.choices[0]?.message.content ?? "응답을 생성하지 못했습니다.";

    // 6) AI 메시지 저장
    const assistantMsg: ChatMessage = {
      role: "assistant",
      content: aiText,
      timestamp: Date.now(),
    };
    addMessage(characterId, assistantMsg);

    // 7) 클라이언트 반환
    return res.json({
      message: "success",
      messages: [userMsg, assistantMsg],
    });
  } catch (error) {
    console.error("❌ AI 메시지 생성 에러:", error);
    return res.status(500).json({
      message: "AI 응답 생성 중 문제가 발생했습니다.",
    });
  }
});

export default router;
