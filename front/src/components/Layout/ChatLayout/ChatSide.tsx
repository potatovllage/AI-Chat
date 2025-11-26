import {
  Box,
  Typography,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CreateChracterButton from "../../Character/CreateChracterButton";

interface ChatItem {
  id: string;
  title: string;
}

const ChatSide = () => {
  const navigate = useNavigate();

  // 로그인 여부 판단
  const token = localStorage.getItem("token");

  const conversations = JSON.parse(
    localStorage.getItem("conversations") || "{}"
  ) as Record<string, unknown>;

  const chatList: ChatItem[] = Object.keys(conversations).map((id) => ({
    id,
    title: `캐릭터 ${id} 대화`,
  }));

  return (
    <Paper
      elevation={2}
      sx={{
        width: 260,
        height: "100%",
        borderRadius: 0,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#F7F7F5",
        boxShadow: "none",
      }}
    >
      {/* Header */}
      <Box p={2}>
        <Typography variant="h6" fontWeight={700}>
          대화 목록
        </Typography>
      </Box>

      <Divider />

      {/* Chat List */}
      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
        <CreateChracterButton />
        <List>
          {chatList.length === 0 ? (
            <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
              저장된 대화가 없습니다.
            </Typography>
          ) : (
            chatList.map((chat) => (
              <ListItemButton
                key={chat.id}
                onClick={() => navigate(`/chat/${chat.id}`)}
              >
                <ListItemText primary={chat.title} />
              </ListItemButton>
            ))
          )}
        </List>
      </Box>

      <Divider />

      {/* Bottom Area — Login / User Info */}
      <Box p={2}>
        {!token ? (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            로그인을 해주세요
          </Typography>
        ) : (
          <Box style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Typography variant="body2" color="text.secondary">
              프로필
            </Typography>
            <Typography variant="subtitle1" fontWeight={600}>
              OOO
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default ChatSide;
