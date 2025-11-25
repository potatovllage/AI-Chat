import { TextField, IconButton, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";

const ChatInput = () => {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (!value.trim()) return;
    console.log("Sent:", value);
    setValue("");
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 1,
        display: "flex",
        alignItems: "center",
        borderRadius: 2,
        border: "1px solid #ddd",
      }}
    >
      <TextField
        variant="standard"
        fullWidth
        placeholder="메시지를 입력하세요..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        InputProps={{ disableUnderline: true }}
      />

      <IconButton color="primary" onClick={handleSend}>
        <SendIcon />
      </IconButton>
    </Paper>
  );
};

export default ChatInput;
