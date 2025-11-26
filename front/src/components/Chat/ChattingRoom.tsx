import { Box } from "@mui/material";
import ChatMessages from "./ChatMessage";
import ChatInput from "./ChatInput";
import EmptyChatLayout from "../Layout/ChatLayout/EmptyChatLayout";
import { useCharacterStore } from "../../store/CharacterStore";

const ChattingRoom = () => {
  const activeCharacterId = useCharacterStore(
    (state) => state.activeCharacterId
  );
  const token = localStorage.getItem("token");

  // 로그인되지 않은 상태
  if (!token) {
    return <EmptyChatLayout message="로그인이 필요합니다" showInput={false} />;
  }

  // 캐릭터 선택되지 않은 상태
  if (!activeCharacterId) {
    return (
      <EmptyChatLayout
        message="대화를 시작할 캐릭터를 선택해주세요"
        showInput={true}
      />
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* 메시지 리스트 영역 */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          padding: 2,
        }}
      >
        <ChatMessages />
      </Box>

      {/* 입력창 영역 */}
      <Box
        sx={{
          borderTop: "1px solid #e0e0e0",
          padding: 2,
        }}
      >
        <ChatInput />
      </Box>
    </Box>
  );
};

export default ChattingRoom;
