import { useState } from "react";

import { Button } from "@mui/material";
import CreateCharacterModal from "./CreateCharacterModal";
import { useNavigate } from "react-router-dom";

const CreateChracterButton = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  // 로그인 여부 판단
  const token = localStorage.getItem("token");

  return (
    <>
      <Button
        sx={{
          p: 2,
          width: "100%",
          cursor: "pointer",
          color: "#555",
          fontWeight: 600,
          fontSize: "15px",
          borderBottom: "1px solid #eee",
          "&:hover": {
            backgroundColor: "#f5f5f5",
          },
        }}
        onClick={() => {
          if (!token) {
            navigate("/login");
          } else {
            setOpen(true);
          }
        }}
      >
        + 새 캐릭터 생성하기
      </Button>

      <CreateCharacterModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default CreateChracterButton;
