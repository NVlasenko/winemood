import type {
  AuthResponseDto,
  LoginRequestDto,
  RegisterRequestDto,
} from "@/types/auth";
import { httpClient } from "./httpClient";

export const authApi = {
  register: (data: RegisterRequestDto) => {
    return httpClient<AuthResponseDto>("/api/auth/registration", {
      method: "POST",
      body: JSON.stringify(data),
      skipAuth: true,
    });
  },

  login: (data: LoginRequestDto) => {
    return httpClient<AuthResponseDto>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
      skipAuth: true,
    });
  },
};