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
import { ApiError } from "@/shared/api/httpClient";

import { queryClient } from "@/shared/lib/reactQuery";
import { refetchAchievementsSafe } from "@/shared/lib/refetchAchievementsSafe";
import {
  resetAuthSessionInvalidation,
  subscribeToAuthSessionInvalidation,
} from "@/shared/lib/authSessionInvalidation";

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
  isAuthReady: boolean;

  register: (
    data: RegisterRequestDto,
  ) => Promise<AuthResponseDto>;

  login: (
    data: LoginRequestDto,
  ) => Promise<AuthResponseDto>;

  logout: () => void;

  updateUser: (
    user: UserDto,
  ) => void;

  refreshUser: () => Promise<void>;
};

const AuthContext =
  createContext<AuthContextType | null>(
    null,
  );

type Props = {
  children: ReactNode;
};

const getSavedAccessToken =
  (): string | null => {
    if (
      typeof window === "undefined"
    ) {
      return null;
    }

    const token =
      localStorage.getItem(
        ACCESS_TOKEN_STORAGE_KEY,
      );

    if (
      !token ||
      token === "undefined" ||
      token === "null"
    ) {
      return null;
    }

    return token;
  };

const getSavedUser =
  (): UserDto | null => {
    if (
      typeof window === "undefined"
    ) {
      return null;
    }

    try {
      const data =
        localStorage.getItem(
          USER_STORAGE_KEY,
        );

      if (!data) {
        return null;
      }

      return JSON.parse(data);
    } catch {
      localStorage.removeItem(
        USER_STORAGE_KEY,
      );

      return null;
    }
  };

const getInitialUser =
  (): UserDto | null => {
    if (
      typeof window === "undefined"
    ) {
      return null;
    }

    const token =
      getSavedAccessToken();

    if (!token) {
      localStorage.removeItem(
        USER_STORAGE_KEY,
      );

      return null;
    }

    return getSavedUser();
  };

export const AuthProvider = ({
  children,
}: Props) => {
  const [
    accessToken,
    setAccessToken,
  ] = useState<string | null>(
    () => getSavedAccessToken(),
  );

  const [
    user,
    setUser,
  ] = useState<UserDto | null>(
    () => getInitialUser(),
  );

  const [
    isLoadingUser,
    setIsLoadingUser,
  ] = useState(false);

  const [
    isAuthReady,
    setIsAuthReady,
  ] = useState(
    () => !getSavedAccessToken(),
  );

  const saveAuthData =
    useCallback(
      (
        data: AuthResponseDto,
      ) => {

        resetAuthSessionInvalidation();

        localStorage.setItem(
          ACCESS_TOKEN_STORAGE_KEY,
          data.accessToken,
        );

        setAccessToken(
          data.accessToken,
        );

        setIsAuthReady(
          false,
        );
      },
      [],
    );

  const updateUser =
    useCallback(
      (
        updatedUser: UserDto,
      ) => {
        setUser(
          updatedUser,
        );

        localStorage.setItem(
          USER_STORAGE_KEY,
          JSON.stringify(
            updatedUser,
          ),
        );
      },
      [],
    );

  const clearQuizSession =
    useCallback(() => {
      sessionStorage.removeItem(
        QUIZ_RESULT_STORAGE_KEY,
      );

      Object.keys(
        sessionStorage,
      ).forEach(
        (key) => {
          if (
            key.startsWith(
              `${QUIZ_SENT_PREFIX}:`,
            )
          ) {
            sessionStorage.removeItem(
              key,
            );
          }
        },
      );
    }, []);

  const clearAuth =
    useCallback(
      ({
        preserveQuiz,
      }: {
        preserveQuiz: boolean;
      }) => {
        localStorage.removeItem(
          ACCESS_TOKEN_STORAGE_KEY,
        );

        localStorage.removeItem(
          USER_STORAGE_KEY,
        );

        localStorage.removeItem(
          "shownAchievements",
        );

        if (!preserveQuiz) {
          clearQuizSession();
        }

        queryClient.clear();

        setAccessToken(
          null,
        );

        setUser(
          null,
        );

        setIsLoadingUser(
          false,
        );

        setIsAuthReady(
          true,
        );
      },
      [
        clearQuizSession,
      ],
    );

  const logout =
    useCallback(() => {
      clearAuth({
        preserveQuiz: false,
      });
    }, [
      clearAuth,
    ]);

  const invalidateSession =
    useCallback(() => {
      clearAuth({
        preserveQuiz: true,
      });
    }, [
      clearAuth,
    ]);


  useEffect(() => {
    return subscribeToAuthSessionInvalidation(
      () => {
        invalidateSession();
      },
    );
  }, [
    invalidateSession,
  ]);

  const refreshUser =
    useCallback(
      async () => {
        if (!accessToken) {
          return;
        }

        try {
          const userData =
            await userApi.getMe();

          updateUser(
            userData,
          );
        } catch (error) {
          if (
            error instanceof ApiError &&
            error.status === 401
          ) {
            invalidateSession();

            return;
          }

          throw error;
        }
      },
      [
        accessToken,
        updateUser,
        invalidateSession,
      ],
    );

  const syncSavedQuiz =
    useCallback(
      async (
        userData: UserDto,
      ) => {
        const savedQuiz =
          sessionStorage.getItem(
            QUIZ_RESULT_STORAGE_KEY,
          );

        if (!savedQuiz) {
          return;
        }

        let wines: WineCatalogCard[];

        try {
          wines =
            JSON.parse(
              savedQuiz,
            );
        } catch {
          sessionStorage.removeItem(
            QUIZ_RESULT_STORAGE_KEY,
          );

          return;
        }

        if (
          !Array.isArray(
            wines,
          ) ||
          wines.length === 0
        ) {
          sessionStorage.removeItem(
            QUIZ_RESULT_STORAGE_KEY,
          );

          return;
        }

        const wineIds =
          wines.map(
            (wine) =>
              wine.id,
          );

        const quizResultKey =
          wineIds.join("-");

        const quizSentKey =
          `${QUIZ_SENT_PREFIX}:${userData.id}:${quizResultKey}`;

        const existingStatus =
          sessionStorage.getItem(
            quizSentKey,
          );

        if (
          existingStatus ===
            "sending" ||
          existingStatus ===
            "sent"
        ) {
          sessionStorage.removeItem(
            QUIZ_RESULT_STORAGE_KEY,
          );

          return;
        }

        try {
          sessionStorage.setItem(
            quizSentKey,
            "sending",
          );

          await userApi.saveQuizResult(
            wineIds,
          );

          sessionStorage.setItem(
            quizSentKey,
            "sent",
          );

          sessionStorage.removeItem(
            QUIZ_RESULT_STORAGE_KEY,
          );

          await queryClient.invalidateQueries({
            queryKey: [
              "quiz-history",
              userData.id,
            ],
          });

          await refetchAchievementsSafe(
            queryClient,
            userData.id,
          );

          const refreshedUser =
            await userApi.getMe();

          updateUser(
            refreshedUser,
          );
        } catch (error) {
          sessionStorage.removeItem(
            quizSentKey,
          );

          if (
            error instanceof ApiError &&
            error.status === 401
          ) {
            invalidateSession();

            return;
          }

          console.error(
            "Failed to send saved quiz",
            error,
          );
        }
      },
      [
        updateUser,
        invalidateSession,
      ],
    );

  const register =
    useCallback(
      async (
        data: RegisterRequestDto,
      ) => {
        return authApi.register(
          data,
        );
      },
      [],
    );

  const login =
    useCallback(
      async (
        data: LoginRequestDto,
      ) => {
        const response =
          await authApi.login(
            data,
          );

        queryClient.clear();

        saveAuthData(
          response,
        );

        try {
          const userData =
            await userApi.getMe();

          updateUser(
            userData,
          );

          setIsAuthReady(
            true,
          );

          await syncSavedQuiz(
            userData,
          );

          return response;
        } catch (error) {
          if (
            error instanceof ApiError &&
            error.status === 401
          ) {
            invalidateSession();
          }

          throw error;
        }
      },
      [
        saveAuthData,
        updateUser,
        syncSavedQuiz,
        invalidateSession,
      ],
    );

  useEffect(() => {
    if (!accessToken) {
      setIsLoadingUser(
        false,
      );

      setIsAuthReady(
        true,
      );

      return;
    }

    let isMounted = true;

    setIsLoadingUser(
      true,
    );

    setIsAuthReady(
      false,
    );

    userApi
      .getMe()
      .then(
        (userData) => {
          if (!isMounted) {
            return;
          }

          updateUser(
            userData,
          );
        },
      )
      .catch(
        (error) => {
          if (!isMounted) {
            return;
          }

          if (
            error instanceof ApiError &&
            error.status === 401
          ) {
            invalidateSession();

            return;
          }

          console.error(
            "Failed to refresh authenticated user:",
            error,
          );
        },
      )
      .finally(() => {
        if (!isMounted) {
          return;
        }

        setIsLoadingUser(
          false,
        );

        setIsAuthReady(
          true,
        );
      });

    return () => {
      isMounted = false;
    };
  }, [
    accessToken,
    updateUser,
    invalidateSession,
  ]);

  const value =
    useMemo(
      () => ({
        accessToken,
        user,

        isAuthenticated:
          isAuthReady &&
          Boolean(
            accessToken &&
            user,
          ),

        isLoadingUser,
        isAuthReady,

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
        isAuthReady,
        register,
        login,
        logout,
        updateUser,
        refreshUser,
      ],
    );

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context =
    useContext(
      AuthContext,
    );

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider",
    );
  }

  return context;
};