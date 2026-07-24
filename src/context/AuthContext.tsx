import { authApi } from "@/shared/api/authApi";
import { userApi } from "@/shared/api/userApi";
import { queryClient } from "@/shared/lib/reactQuery";
import type { AuthResponse, LoginRequest, RegisterRequest } from "@/types/auth";
import type { UserResponse } from "@/types/user";
import type { Wine } from "@/types/wine";
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
const USER_STORAGE_KEY = "user";

type AuthContextType = {
  accessToken: string | null;
  user: UserResponse | null;
  isAuthenticated: boolean;
  isLoadingUser: boolean;

  register: (data: RegisterRequest) => Promise<AuthResponse>;
  login: (data: LoginRequest) => Promise<AuthResponse>;
  logout: () => void;

  updateUser: (user: UserResponse) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

type Props = {
  children: ReactNode;
};

const getSavedAccessToken = () => {
  const token = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);

  if (!token || token === "undefined" || token === "null") {
    return null;
  }

  return token;
};

const getSavedUser = (): UserResponse | null => {
  try {
    const data = localStorage.getItem(USER_STORAGE_KEY);
    if (!data) return null;
    return JSON.parse(data);
  } catch {
    localStorage.removeItem(USER_STORAGE_KEY);
    return null;
  }
};

export const AuthProvider = ({ children }: Props) => {
  const [accessToken, setAccessToken] = useState<string | null>(() =>
    getSavedAccessToken()
  );

  const [user, setUser] = useState<UserResponse | null>(() =>
    getSavedUser()
  );

  const [isLoadingUser, setIsLoadingUser] = useState(false);

  const saveAuthData = useCallback((data: AuthResponse) => {
    localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, data.accessToken);
    setAccessToken(data.accessToken);
  }, []);

  const updateUser = useCallback((updatedUser: UserResponse) => {
    setUser(updatedUser);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);

    setAccessToken(null);
    setUser(null);
  }, []);

  const register = useCallback(
    async (data: RegisterRequest) => {
      const response = await authApi.register(data);
  
      console.log("REGISTER RESPONSE:", response);
  
      return response;
    },
    []
  );

  const login = useCallback(
    async (data: LoginRequest) => {
      const response = await authApi.login(data);

      saveAuthData(response);

      const userData = await userApi.getMe();
      updateUser(userData);

const savedQuiz = sessionStorage.getItem("quizResult");

if (savedQuiz) {
  try {
    const wines: Wine[] = JSON.parse(savedQuiz);
    const wineIds = wines.map((w) => w.id);

    await userApi.saveQuizResult(wineIds);

    queryClient.invalidateQueries({ queryKey: ["quiz-history"] });

    sessionStorage.removeItem("quizResult"); 
  } catch (e) {
    console.error("Failed to send saved quiz", e);
  }
}

      return response;
    },
    [saveAuthData, updateUser]
  );

  useEffect(() => {
    if (!accessToken) return;

    let isMounted = true;

    setIsLoadingUser(true);

    userApi
      .getMe()
      .then((userData) => {
        if (isMounted) updateUser(userData);
      })
      .catch(() => {
        console.error("Auth invalid → logout");
        logout();
      })
      .finally(() => {
        if (isMounted) setIsLoadingUser(false);
      });

    return () => {
      isMounted = false;
    };
  }, [accessToken, updateUser, logout]);

  const value = useMemo(
    () => ({
      accessToken,
      user,
      isAuthenticated: Boolean(accessToken),
      isLoadingUser,
      register,
      login,
      logout,
      updateUser,
    }),
    [
      accessToken,
      user,
      isLoadingUser,
      register,
      login,
      logout,
      updateUser,
    ]
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