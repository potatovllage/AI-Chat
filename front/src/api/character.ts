import axiosInstance from "../lib/axios";
import type {
  CreateCharacterInput,
  CreateCharacterResponse,
  GetCharactersResponse,
} from "../types/api/chracter";

export const createCharacterApi = async (
  data: CreateCharacterInput
): Promise<CreateCharacterResponse> => {
  const res = await axiosInstance.post("/characters", data);
  return res.data;
};

export const getCharactersApi = async (): Promise<GetCharactersResponse> => {
  const res = await axiosInstance.get("/characters");
  return res.data;
};
