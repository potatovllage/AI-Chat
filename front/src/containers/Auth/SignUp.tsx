import { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PasswordField from "../../components/Auth/PasswordField";
import { useSignup } from "../../hooks/useAuth";

const Signup = () => {
  const navigate = useNavigate();
  const { mutate: signup } = useSignup();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");

  // 이메일 정규식
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // 비밀번호 정규식
  const pwRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=])[A-Za-z\d!@#$%^&*()_+\-=]{8,12}$/;

  const isEmailValid = emailRegex.test(email);
  const isPwValid = pwRegex.test(pw);
  const isPwMatch = pw === pwConfirm;

  const handleSignup = () => {
    if (!isEmailValid) return alert("올바른 이메일을 입력해주세요.");
    if (!isPwValid) return alert("비밀번호 조건을 확인해주세요.");
    if (!isPwMatch) return alert("비밀번호가 일치하지 않습니다.");

    signup(
      { name, email, password: pw },
      {
        onSuccess: () => {
          alert("회원가입 성공! 로그인해주세요.");
          navigate("/login");
        },
        onError: (err) => {
          alert(err.message || "회원가입 실패");
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
        <Typography textAlign="center" variant="h5" mb={3} fontWeight={700}>
          회원가입
        </Typography>

        {/* 이름 */}
        <TextField
          label="이름"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        {/* 비밀번호 확인 */}
        <PasswordField
          label="비밀번호 확인"
          value={pwConfirm}
          error={pwConfirm.length > 0 && !isPwMatch}
          helperText={
            pwConfirm.length > 0 && !isPwMatch
              ? "비밀번호가 일치하지 않습니다."
              : ""
          }
          onChange={(e) => setPwConfirm(e.target.value)}
        />

        {/* 비밀번호 조건 안내 */}
        <Typography
          variant="caption"
          color={isPwValid ? "green" : "error"}
          sx={{ display: "block", mt: 1 }}
        >
          비밀번호 조건: 8~12자, 영어 대소문자 + 숫자 + 특수문자 포함
        </Typography>

        {/* 비밀번호 일치 안내 */}
        {pwConfirm.length > 0 && (
          <Typography
            variant="caption"
            color={isPwMatch ? "green" : "error"}
            sx={{ display: "block", mt: 0.5 }}
          >
            {isPwMatch
              ? "비밀번호가 일치합니다."
              : "비밀번호가 일치하지 않습니다."}
          </Typography>
        )}

        {/* 회원가입 버튼 */}
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
          onClick={handleSignup}
          disabled={!isEmailValid || !isPwValid || !isPwMatch || !name}
        >
          회원가입 완료
        </Button>
      </Box>
    </Box>
  );
};

export default Signup;
