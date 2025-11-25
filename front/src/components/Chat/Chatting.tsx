import { Box } from "@mui/material";
import ChatMessages from "./ChatMessage";
import ChatInput from "./ChatInput";

const Chatting = () => {
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

export default Chatting;
