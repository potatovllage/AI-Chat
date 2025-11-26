import { useMutation } from "@tanstack/react-query";
import type { SignupInput, SignupResponse } from "../types/api/auth";
import { signupApi } from "../api/auth";

export const useSignup = () => {
  return useMutation<SignupResponse, Error, SignupInput>({
    mutationFn: signupApi,
  });
};
