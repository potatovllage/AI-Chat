import { useMutation, useQuery } from "@tanstack/react-query";
import type {
  LoginInput,
  LoginResponse,
  SignupInput,
  SignupResponse,
  UserProfileResponse,
} from "../types/api/auth";
import { getUserApi, loginApi, signupApi } from "../api/auth";

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginInput>({
    mutationFn: loginApi,
  });
};

export const useSignup = () => {
  return useMutation<SignupResponse, Error, SignupInput>({
    mutationFn: signupApi,
  });
};

export const useUser = () => {
  return useQuery<UserProfileResponse>({
    queryKey: ["user"],
    queryFn: getUserApi,
  });
};
