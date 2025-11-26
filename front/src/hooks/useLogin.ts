import { useMutation } from "@tanstack/react-query";
import type { LoginInput, LoginResponse } from "../types/api/auth";
import { loginApi } from "../api/auth";

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginInput>({
    mutationFn: loginApi,
  });
};
