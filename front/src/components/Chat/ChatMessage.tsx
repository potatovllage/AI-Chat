import { Box, Paper } from "@mui/material";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const mockMessages: Message[] = [
  { id: "1", role: "assistant", content: "안녕하세요! 무엇을 도와드릴까요?" },
  { id: "2", role: "user", content: "사이드바 높이가 너무 커요" },
  {
    id: "3",
    role: "assistant",
    content: "그 부분은 스타일 조정으로 해결 가능합니다 :)",
  },
];

const ChatMessages = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {mockMessages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
    </Box>
  );
};

const MessageBubble = ({ message }: { message: Message }) => {
  const isUser = message.role === "user";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          maxWidth: "75%",
          padding: "12px 16px",
          borderRadius: 2,
          backgroundColor: isUser ? "#1976d2" : "#e0e0e0",
          color: isUser ? "white" : "black",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        {message.content}
      </Paper>
    </Box>
  );
};

export default ChatMessages;
