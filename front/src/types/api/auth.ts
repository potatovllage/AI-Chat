// 회원가입 요청 타입
export interface SignupInput {
  name: string;
  email: string;
  password: string;
}

// 회원가입 응답 타입
export interface SignupResponse {
  message: string;
}

// 로그인 요청 타입
export interface LoginInput {
  email: string;
  password: string;
}

// 로그인 응답 타입
export interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}
