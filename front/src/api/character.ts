import axiosInstance from "../lib/axios";
import type {
  CreateCharacterInput,
  CreateCharacterResponse,
} from "../types/api/chracter";

export const createCharacterApi = async (
  data: CreateCharacterInput
): Promise<CreateCharacterResponse> => {
  const res = await axiosInstance.post("/characters", data);
  return res.data;
};
