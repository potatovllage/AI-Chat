import { useState } from "react";
import { Box, TextField, IconButton, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

interface Props {
  activeCharacterId: string;
  onSend: (message: string) => void;
}

const ChatInput = ({ activeCharacterId, onSend }: Props) => {
  const [value, setValue] = useState("");
  const maxLength = 200;

  const handleSend = () => {
    if (!value.trim()) return;
    if (value.length > maxLength) return;

    onSend(value.trim());
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
        InputProps={{
          endAdornment: (
            <IconButton color="primary" onClick={handleSend}>
              <SendIcon />
            </IconButton>
          ),
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
