import { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface Props {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
}

const PasswordField = ({
  label,
  value,
  onChange,
  error,
  helperText,
}: Props) => {
  const [showPw, setShowPw] = useState(false);

  return (
    <TextField
      label={label}
      type={showPw ? "text" : "password"}
      fullWidth
      margin="normal"
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => setShowPw((prev) => !prev)} edge="end">
              {showPw ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordField;
