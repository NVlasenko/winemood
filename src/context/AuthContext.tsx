import { authApi } from "@/shared/api/authApi";
import { userApi } from "@/shared/api/userApi";
import type { AuthResponse, LoginRequest, RegisterRequest } from "@/types/auth";
import type { User } from "@/types/user";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
  type ReactNode,
} from "react";

const ACCESS_TOKEN_STORAGE_KEY = "accessToken";
const TOKEN_TYPE_STORAGE_KEY = "tokenType";
const USER_STORAGE_KEY = "user";

type AuthContextType = {
  accessToken: string | null;
  tokenType: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoadingUser: boolean;

  register: (data: RegisterRequest) => Promise<AuthResponse>;
  login: (data: LoginRequest) => Promise<AuthResponse>;
  logout: () => void;

  updateUser: (user: User) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

type Props = {
  children: ReactNode;
};

const getSavedAccessToken = () =>
  localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);

const getSavedTokenType = () =>
  localStorage.getItem(TOKEN_TYPE_STORAGE_KEY);

const getSavedUser = (): User | null => {
  try {
    const data = localStorage.getItem(USER_STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
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

  const [isLoadingUser, setIsLoadingUser] = useState(false);

  const saveAuthData = useCallback((data: AuthResponse) => {
    localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, data.accessToken);
    localStorage.setItem(TOKEN_TYPE_STORAGE_KEY, data.tokenType);

    setAccessToken(data.accessToken);
    setTokenType(data.tokenType);
  }, []);

  const updateUser = useCallback((updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
  }, []);

  const register = useCallback(
    async (data: RegisterRequest) => {
      const response = await authApi.register(data);
      saveAuthData(response);

      const userData = await userApi.getMe();
      updateUser(userData);

      return response;
    },
    [saveAuthData, updateUser],
  );

  const login = useCallback(
    async (data: LoginRequest) => {
      const response = await authApi.login(data);
      saveAuthData(response);

      const userData = await userApi.getMe();
      updateUser(userData);

      return response;
    },
    [saveAuthData, updateUser],
  );

  const logout = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
    localStorage.removeItem(TOKEN_TYPE_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);

    setAccessToken(null);
    setTokenType(null);
    setUser(null);
  }, []);

  useEffect(() => {
    if (!accessToken) return;

    let isMounted = true;

    setIsLoadingUser(true);

    userApi
      .getMe()
      .then((userData) => {
        if (isMounted) {
          updateUser(userData);
        }
      })
      .catch(() => {
        console.error("Failed to fetch user");
      })
      .finally(() => {
        if (isMounted) {
          setIsLoadingUser(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [accessToken, updateUser]);

  const value = useMemo(
    () => ({
      accessToken,
      tokenType,
      user,
      isAuthenticated: Boolean(accessToken && user),
      isLoadingUser,
      register,
      login,
      logout,
      updateUser,
    }),
    [
      accessToken,
      tokenType,
      user,
      isLoadingUser,
      register,
      login,
      logout,
      updateUser,
    ],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};