import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  CreateCharacterInput,
  CreateCharacterResponse,
  GetCharactersResponse,
} from "../types/api/chracter";
import { createCharacterApi, getCharactersApi } from "../api/character";

export const useCreateCharacter = () => {
  const qc = useQueryClient();

  return useMutation<CreateCharacterResponse, Error, CreateCharacterInput>({
    mutationFn: createCharacterApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["characters"] });
    },
  });
};

export const useCharacters = () => {
  return useQuery<GetCharactersResponse>({
    queryKey: ["characters"],
    queryFn: getCharactersApi,
  });
};
