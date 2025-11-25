import { useMutation } from "@tanstack/react-query";
import { signupApi } from "../api/auth";

export const useSignup = () => {
  return useMutation({
    mutationFn: signupApi,
  });
};
