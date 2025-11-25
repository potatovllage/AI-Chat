import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ChatHeader = () => {
  const navigate = useNavigate();

  // 로그인 여부 판단
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username"); // 로그인 시 저장했다고 가정

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <AppBar
      position="sticky"
      elevation={1}
      style={{ boxShadow: "none" }}
      sx={{
        backgroundColor: "#ffffff",
        color: "#000",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* LEFT: LOGO */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            cursor: "pointer",
            userSelect: "none",
            color: "#0E51D6",
          }}
          onClick={() => navigate("/characters")}
        >
          MY STAFF
        </Typography>

        {/* RIGHT: 로그인 여부 판단 후 프로필 노출 */}
        {!token ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            sx={{ textTransform: "none" }}
          >
            로그인
          </Button>
        ) : (
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="body1" fontWeight={500}>
              {username}
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleLogout}
              sx={{ textTransform: "none" }}
            >
              로그아웃
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default ChatHeader;
