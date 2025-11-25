import { Box, Container } from "@mui/material";
import ChatHeader from "../components/Layout/ChatLayout/ChatHeader";
import ChatSide from "../components/Layout/ChatLayout/ChatSide";
import Chatting from "../components/Chat/Chatting";

const ChatPage = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100dvh" }}>
      {/* Header */}
      <ChatHeader />
      <Box sx={{ display: "flex", flexGrow: 1, overflow: "hidden" }}>
        {/* Sidebar */}
        <Box sx={{ width: 260, borderRight: "1px solid #eee" }}>
          <ChatSide />
        </Box>
        <Container
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            py: 2,
          }}
        >
          <Chatting />
        </Container>
      </Box>
    </Box>
  );
};

export default ChatPage;
