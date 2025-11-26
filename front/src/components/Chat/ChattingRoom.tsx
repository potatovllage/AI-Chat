import { Box } from "@mui/material";
import ChatMessages from "./ChatMessage";
import ChatInput from "./ChatInput";
import EmptyChatLayout from "../Layout/ChatLayout/EmptyChatLayout";
import { useParams } from "react-router-dom";

const ChattingRoom = () => {
  const { characterId } = useParams();
  const token = localStorage.getItem("token");

  // 로그인되지 않은 상태
  if (!token) {
    return <EmptyChatLayout message="로그인이 필요합니다" showInput={false} />;
  }

  // 캐릭터 선택되지 않은 상태
  if (!characterId) {
    return (
      <EmptyChatLayout
        message="대화를 시작할 캐릭터를 선택해주세요"
        showInput={false}
      />
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "800px",
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
          width: "100%",
          padding: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ChatInput />
      </Box>
    </Box>
  );
};

export default ChattingRoom;
