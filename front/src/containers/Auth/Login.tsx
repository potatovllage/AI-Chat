import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PasswordField from "../../components/Auth/PasswordField";
import { useLogin } from "../../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { mutate: login } = useLogin();

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  // 이메일 정규식
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email);

  // 비밀번호 정규식 (회원가입과 동일)
  const pwRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=])[A-Za-z\d!@#$%^&*()_+\-=]{8,12}$/;

  const isPwValid = pwRegex.test(pw);

  const canLogin = isEmailValid && isPwValid;

  const handleLogin = () => {
    login(
      { email, password: pw },
      {
        onSuccess: (data) => {
          // 토큰 저장
          localStorage.setItem("token", data.token);

          alert("로그인 성공!");
          navigate("/");
        },
        onError: (err) => {
          alert(err.message);
        },
      }
    );
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ maxWidth: 360, mx: "auto" }}>
        <Typography textAlign="center" variant="h5" fontWeight={700} mb={3}>
          로그인
        </Typography>

        {/* 이메일 */}
        <TextField
          label="이메일"
          fullWidth
          margin="normal"
          value={email}
          error={email.length > 0 && !isEmailValid}
          helperText={
            email.length > 0 && !isEmailValid
              ? "유효한 이메일 형식이 아닙니다."
              : ""
          }
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* 비밀번호 */}
        <PasswordField
          label="비밀번호"
          value={pw}
          error={pw.length > 0 && !isPwValid}
          helperText={
            pw.length > 0 && !isPwValid
              ? "8~12자, 영어 대소문자 + 숫자 + 특수문자를 포함해야 합니다."
              : ""
          }
          onChange={(e) => setPw(e.target.value)}
        />

        {/* 로그인 버튼 */}
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          disabled={!canLogin}
          onClick={handleLogin}
          style={{
            height: "48px",
          }}
        >
          로그인
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
