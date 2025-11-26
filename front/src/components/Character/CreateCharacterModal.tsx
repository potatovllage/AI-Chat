import { useState, type ChangeEvent } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Avatar,
} from "@mui/material";
import { useCreateCharacter } from "../../hooks/useCharactor";

interface Props {
  open: boolean;
  onClose: () => void;
}

const CreateCharacterModal = ({ open, onClose }: Props) => {
  const { mutate: createCharacter } = useCreateCharacter();

  const [characterForm, setCharacterForm] = useState({
    name: "",
    description: "",
    prompt: "",
    thumbnail: "",
  });
  const { description, name, prompt, thumbnail } = characterForm;

  const handleChange = (key: keyof typeof characterForm, value: string) => {
    setCharacterForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      handleChange("thumbnail", reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    const { name, description, prompt, thumbnail } = characterForm;

    if (!name || !description || !prompt || !thumbnail) {
      return alert("모든 필드를 입력해주세요!");
    }

    createCharacter(characterForm);

    // form 초기화
    setCharacterForm({
      name: "",
      description: "",
      prompt: "",
      thumbnail: "",
    });

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>새 캐릭터 생성</DialogTitle>

      <DialogContent dividers>
        <Box display="flex" flexDirection="column" gap={2}>
          <Box textAlign="center">
            <Avatar
              src={thumbnail || ""}
              sx={{ width: 100, height: 100, margin: "0 auto" }}
            />
            <Button variant="outlined" component="label" sx={{ mt: 1 }}>
              이미지 업로드
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleImageUpload}
              />
            </Button>
          </Box>

          <TextField
            label="캐릭터 이름"
            fullWidth
            value={name}
            onChange={(e) => handleChange("name", e.target.value)}
          />

          <TextField
            label="설명"
            fullWidth
            multiline
            minRows={2}
            value={description}
            onChange={(e) => handleChange("description", e.target.value)}
          />

          <TextField
            label="캐릭터 프롬프트"
            fullWidth
            multiline
            minRows={4}
            value={prompt}
            onChange={(e) => handleChange("prompt", e.target.value)}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => {
            setCharacterForm({
              name: "",
              description: "",
              prompt: "",
              thumbnail: "",
            });
            onClose();
          }}
        >
          취소
        </Button>

        <Button variant="contained" onClick={handleSubmit}>
          생성
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateCharacterModal;
