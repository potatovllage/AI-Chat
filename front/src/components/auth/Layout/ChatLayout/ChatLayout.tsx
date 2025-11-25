import { Box, Container } from "@mui/material";
import ChatHeader from "./components/ChatHeader";
import ChatSide from "./components/ChatSide";
import type { JSX } from "@emotion/react/jsx-runtime";

interface ChatLayoutProps {
  content?: JSX.Element;
}

const ChatLayout = ({ content }: ChatLayoutProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100dvh" }}>
      {/* Header */}
      <ChatHeader />

      {/* Body 영역: Sidebar + Content 나란히 */}
      <Box sx={{ display: "flex", flexGrow: 1, overflow: "hidden" }}>
        {/* Sidebar */}
        <Box sx={{ width: 260, borderRight: "1px solid #eee" }}>
          <ChatSide />
        </Box>

        {/* Main Content */}
        <Container
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            py: 2,
          }}
        >
          {content}
        </Container>
      </Box>
    </Box>
  );
};

export default ChatLayout;
