import { Box, Typography, Divider, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CreateChracterButton from "../../Character/create/CreateChracterButton";
import { useUser } from "../../../hooks/useAuth";
import CharacterList from "../../Character/CharacterList";
import { useCharacters } from "../../../hooks/useCharactor";

const ChatSide = () => {
  const navigate = useNavigate();

  // 로그인 여부 판단
  const token = localStorage.getItem("token");

  const { data: userData } = useUser();
  const { data } = useCharacters();

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
        <CharacterList characters={data?.characters ?? []} />
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
              {userData?.name}
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default ChatSide;
