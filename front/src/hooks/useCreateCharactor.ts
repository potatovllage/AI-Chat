import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  CreateCharacterInput,
  CreateCharacterResponse,
} from "../types/api/chracter";
import { createCharacterApi } from "../api/character";

export const useCreateCharacter = () => {
  const qc = useQueryClient();

  return useMutation<CreateCharacterResponse, Error, CreateCharacterInput>({
    mutationFn: createCharacterApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["characters"] });
    },
  });
};
