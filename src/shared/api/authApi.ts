import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "@/types/auth";
import { httpClient } from "./httpClient";

export const authApi = {
  register: (data: RegisterRequest) => {
    return httpClient<AuthResponse>("/api/auth/registration", {
      method: "POST",
      body: JSON.stringify(data),
      skipAuth: true,
    });
  },

  login: (data: LoginRequest) => {
    return httpClient<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
      skipAuth: true,
    });
  },
};