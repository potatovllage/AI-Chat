import axios from "axios";
import axiosInstance from "../lib/axios";
import type {
  SignupInput,
  SignupResponse,
  LoginInput,
  LoginResponse,
  UserProfileResponse,
} from "../types/api/auth";

export const signupApi = async (data: SignupInput): Promise<SignupResponse> => {
  try {
    const res = await axiosInstance.post("/auth/signup", data);
    return res.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data?.message || "회원가입 실패");
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
};

export const loginApi = async (data: LoginInput): Promise<LoginResponse> => {
  try {
    const res = await axiosInstance.post("/auth/login", data);
    return res.data; // 성공 → 토큰 + 유저 정보
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data?.message || "로그인 실패");
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
};

export const getUserApi = async (): Promise<UserProfileResponse> => {
  const res = await axiosInstance.get("/auth/me");
  return res.data;
};
