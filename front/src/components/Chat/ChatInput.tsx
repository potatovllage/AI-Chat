import { useState, type KeyboardEvent } from "react";
import { Box, TextField, IconButton, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const ChatInput = () => {
  const [value, setValue] = useState("");
  const maxLength = 200;

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    // Enter + Shift → 줄바꿈 허용
    if (e.key === "Enter" && e.shiftKey) {
      return;
    }

    // Enter 단독 → 메시지 전송
    if (e.key === "Enter") {
      if (value === "") {
        e.preventDefault();
        return;
      }

      e.preventDefault(); // 기본 줄바꿈 방지
      handleSend();
    }
  };

  const handleSend = () => {
    if (!value.trim()) return;
    if (value.length > maxLength) return;

    // onSend(value.trim());
    setValue("");
  };

  return (
    <Box>
      <TextField
        fullWidth
        multiline
        maxRows={4}
        placeholder="메시지를 입력하세요..."
        value={value}
        onChange={(e) => setValue(e.target.value.slice(0, maxLength))}
        onKeyDown={handleKeyDown}
        slotProps={{
          input: {
            endAdornment: (
              <IconButton color="primary" onClick={handleSend}>
                <SendIcon />
              </IconButton>
            ),
          },
        }}
      />

      <Typography
        variant="caption"
        sx={{ display: "block", textAlign: "right", mt: 0.5 }}
        color={value.length >= maxLength ? "error" : "text.secondary"}
      >
        {value.length} / {maxLength}
      </Typography>
    </Box>
  );
};

export default ChatInput;
