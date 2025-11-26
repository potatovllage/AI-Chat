// src/components/character/CharacterList.tsx
import {
  Box,
  List,
  ListSubheader,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from "@mui/material";
import type { Character } from "../../types/api/chracter";
import { useCharacterStore } from "../../store/CharacterStore";

interface CharacterListProps {
  characters: Character[];
}

const CharacterList = ({ characters }: CharacterListProps) => {
  const systemCharacters = characters.filter((c) => c.owner === "system");
  const userCharacters = characters.filter((c) => c.owner !== "system");

  const { activeCharacterId, setActiveCharacterId } = useCharacterStore();

  const renderSection = (title: string, list: Character[]) => {
    if (list.length === 0) return null;

    return (
      <List
        subheader={
          <ListSubheader
            sx={{
              bgcolor: "transparent",
              lineHeight: "32px",
              fontSize: 13,
              fontWeight: 600,
              color: "#888",
            }}
          >
            {title}
          </ListSubheader>
        }
      >
        {list.map((character) => (
          <ListItemButton
            key={character.id}
            selected={activeCharacterId === character.id}
            onClick={() => setActiveCharacterId(character.id)}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              "&.Mui-selected": {
                bgcolor: "#e3f2fd",
              },
              "&.Mui-selected:hover": {
                bgcolor: "#bbdefb",
              },
            }}
          >
            <ListItemAvatar>
              <Avatar src={character.thumbnail} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography fontSize={14} fontWeight={600}>
                  {character.name}
                </Typography>
              }
              secondary={
                <Typography fontSize={12} color="text.secondary" noWrap>
                  {character.description}
                </Typography>
              }
            />
          </ListItemButton>
        ))}
      </List>
    );
  };

  return (
    <Box>
      {renderSection("기본 캐릭터", systemCharacters)}
      {renderSection("내 캐릭터", userCharacters)}
    </Box>
  );
};

export default CharacterList;
