import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface Props {
  pageName: "LOGIN" | "SIGNUP";
}

const AuthHeader = ({ pageName }: Props) => {
  const isLogin = pageName === "LOGIN";

  return (
    <Box
      component="header"
      sx={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "100%",
        height: "64px",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        zIndex: 100,
      }}
    >
      <Box
        sx={{
          padding: "30px 30px 0 0",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <Typography
          sx={{
            color: "#8b95a1",
            fontSize: "15px",
            fontWeight: 600,
            lineHeight: "20px",
          }}
        >
          {isLogin ? "아직 계정이 없으신가요?" : "이미 계정이 있으신가요?"}
        </Typography>

        <Button
          component={Link}
          to={isLogin ? "/signup" : "/login"}
          variant="outlined"
          sx={{
            fontSize: "15px",
            lineHeight: "20px",
            color: "#2e3238",
            padding: "6px 12px",
            backgroundColor: "#ffffff",
            borderColor: "#e5e8eb",
            borderRadius: "2px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#e5e8eb",
              borderColor: "#cfd3d7",
            },
          }}
        >
          {isLogin ? "계정 만들기" : "로그인"}
        </Button>
      </Box>
    </Box>
  );
};

export default AuthHeader;
