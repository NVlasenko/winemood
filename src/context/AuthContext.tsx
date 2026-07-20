import { authApi } from "@/shared/api/authApi";
import type { AuthResponse, LoginRequest, RegisterRequest } from "@/types/auth";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const ACCESS_TOKEN_STORAGE_KEY = "accessToken";
const TOKEN_TYPE_STORAGE_KEY = "tokenType";
const USER_STORAGE_KEY = "user";

type User = {
  id: number;
  name: string;
  email: string;
};

type AuthContextType = {
  accessToken: string | null;
  tokenType: string | null;
  user: User | null;
  isAuthenticated: boolean;
  register: (data: RegisterRequest) => Promise<AuthResponse>;
  login: (data: LoginRequest) => Promise<AuthResponse>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

type Props = {
  children: ReactNode;
};

const getSavedAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
};

const getSavedTokenType = () => {
  return localStorage.getItem(TOKEN_TYPE_STORAGE_KEY);
};

const getSavedUser = (): User | null => {
  const data = localStorage.getItem(USER_STORAGE_KEY);
  return data ? JSON.parse(data) : null;
};

export const AuthProvider = ({ children }: Props) => {
  const [accessToken, setAccessToken] = useState<string | null>(() =>
    getSavedAccessToken(),
  );

  const [tokenType, setTokenType] = useState<string | null>(() =>
    getSavedTokenType(),
  );

  const [user, setUser] = useState<User | null>(() =>
    getSavedUser(),
  );

  const saveAuthData = useCallback((data: AuthResponse) => {
    localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, data.accessToken);
    localStorage.setItem(TOKEN_TYPE_STORAGE_KEY, data.tokenType);

    if (data.user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data.user));
      setUser(data.user);
    }

    setAccessToken(data.accessToken);
    setTokenType(data.tokenType);
  }, []);

  const register = useCallback(
    async (data: RegisterRequest) => {
      const response = await authApi.register(data);
      saveAuthData(response);
      return response;
    },
    [saveAuthData],
  );

  const login = useCallback(
    async (data: LoginRequest) => {
      const response = await authApi.login(data);
      saveAuthData(response);
      return response;
    },
    [saveAuthData],
  );

  const logout = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
    localStorage.removeItem(TOKEN_TYPE_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);

    setAccessToken(null);
    setTokenType(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      accessToken,
      tokenType,
      user,
      isAuthenticated: Boolean(accessToken),
      register,
      login,
      logout,
    }),
    [accessToken, tokenType, user, register, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};