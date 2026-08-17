import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { authApi } from "@/shared/api/authApi";
import { userApi } from "@/shared/api/userApi";

import { queryClient } from "@/shared/lib/reactQuery";
import { refetchAchievementsSafe } from "@/shared/lib/refetchAchievementsSafe";

import type {
  AuthResponseDto,
  LoginRequestDto,
  RegisterRequestDto,
} from "@/types/auth";

import type { UserDto } from "@/types/user";
import type { WineCatalogCard } from "@/types/wineCatalogCard";

const ACCESS_TOKEN_STORAGE_KEY = "accessToken";
const USER_STORAGE_KEY = "user";

const QUIZ_RESULT_STORAGE_KEY = "quizResult";
const QUIZ_SENT_PREFIX = "quizSent:v1";

type AuthContextType = {
  accessToken: string | null;
  user: UserDto | null;
  isAuthenticated: boolean;
  isLoadingUser: boolean;

  register: (data: RegisterRequestDto) => Promise<AuthResponseDto>;
  login: (data: LoginRequestDto) => Promise<AuthResponseDto>;
  logout: () => void;

  updateUser: (user: UserDto) => void;
  refreshUser: () => Promise<void>;
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

const getSavedUser = (): UserDto | null => {
  try {
    const data = localStorage.getItem(USER_STORAGE_KEY);

    if (!data) {
      return null;
    }

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

  const [user, setUser] = useState<UserDto | null>(() => getSavedUser());

  const [isLoadingUser, setIsLoadingUser] = useState(false);

  const saveAuthData = useCallback((data: AuthResponseDto) => {
    localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, data.accessToken);

    setAccessToken(data.accessToken);
  }, []);

  const updateUser = useCallback((updatedUser: UserDto) => {
    setUser(updatedUser);

    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
  }, []);

  const refreshUser = useCallback(async () => {
    if (!accessToken) {
      return;
    }

    const userData = await userApi.getMe();

    updateUser(userData);
  }, [accessToken, updateUser]);

  const syncSavedQuiz = useCallback(async (userData: UserDto) => {
    const savedQuiz = sessionStorage.getItem(QUIZ_RESULT_STORAGE_KEY);

    if (!savedQuiz) {
      return;
    }

    let wines: WineCatalogCard[];

    try {
      wines = JSON.parse(savedQuiz);
    } catch {
      sessionStorage.removeItem(QUIZ_RESULT_STORAGE_KEY);

      return;
    }

    if (!Array.isArray(wines) || wines.length === 0) {
      sessionStorage.removeItem(QUIZ_RESULT_STORAGE_KEY);

      return;
    }

    const wineIds = wines.map((wine) => wine.id);

    const quizResultKey = wineIds.join("-");

    const quizSentKey = `${QUIZ_SENT_PREFIX}:${userData.id}:${quizResultKey}`;

    const existingStatus = sessionStorage.getItem(quizSentKey);

    if (existingStatus === "sending" || existingStatus === "sent") {
      sessionStorage.removeItem(QUIZ_RESULT_STORAGE_KEY);

      return;
    }

    try {
      sessionStorage.setItem(quizSentKey, "sending");

      await userApi.saveQuizResult(wineIds);
      sessionStorage.setItem(quizSentKey, "sent");

      sessionStorage.removeItem(QUIZ_RESULT_STORAGE_KEY);
      await queryClient.invalidateQueries({
        queryKey: ["quiz-history", userData.id],
      });

      await refetchAchievementsSafe(queryClient, userData.id);
    } catch (error) {
      sessionStorage.removeItem(quizSentKey);

      console.error("Failed to send saved quiz", error);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);

    localStorage.removeItem(USER_STORAGE_KEY);

    localStorage.removeItem("shownAchievements");

    sessionStorage.removeItem(QUIZ_RESULT_STORAGE_KEY);

    Object.keys(sessionStorage).forEach((key) => {
      if (key.startsWith(`${QUIZ_SENT_PREFIX}:`)) {
        sessionStorage.removeItem(key);
      }
    });

    queryClient.clear();

    setAccessToken(null);
    setUser(null);
  }, []);

  const register = useCallback(async (data: RegisterRequestDto) => {
    const response = await authApi.register(data);

    console.log("REGISTER RESPONSE:", response);

    return response;
  }, []);

  const login = useCallback(
    async (data: LoginRequestDto) => {
      const response = await authApi.login(data);

      queryClient.clear();

      saveAuthData(response);

      const userData = await userApi.getMe();

      updateUser(userData);

      await syncSavedQuiz(userData);

      return response;
    },
    [saveAuthData, updateUser, syncSavedQuiz]
  );

  useEffect(() => {
    if (!accessToken) {
      return;
    }

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
        console.error("Auth invalid → logout");

        logout();
      })
      .finally(() => {
        if (isMounted) {
          setIsLoadingUser(false);
        }
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
      refreshUser,
    }),
    [
      accessToken,
      user,
      isLoadingUser,
      register,
      login,
      logout,
      updateUser,
      refreshUser,
    ]
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
