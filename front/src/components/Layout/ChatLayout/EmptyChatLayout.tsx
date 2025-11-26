import { Box, Typography } from "@mui/material";
import ChatInput from "../../Chat/ChatInput";

interface Props {
  message: string;
  showInput?: boolean;
}

const EmptyChatLayout = ({ message, showInput = true }: Props) => {
  return (
    <Box
      display="flex"
      width="100%"
      maxWidth="800px"
      height="100%"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      gap={4}
      px={2}
    >
      {/* 안내 문구 */}
      <Typography variant="h5" fontWeight={700}>
        {message}
      </Typography>

      {/* 가운데 정렬된 ChatGPT 스타일 입력창 */}
      {showInput && <ChatInput />}
    </Box>
  );
};

export default EmptyChatLayout;
