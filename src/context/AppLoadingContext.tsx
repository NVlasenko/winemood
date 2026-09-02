import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type AppLoadingContextValue = {
  isBackendLoading: boolean;
  startBackendLoading: () => void;
  stopBackendLoading: () => void;
};

const AppLoadingContext =
  createContext<AppLoadingContextValue | null>(
    null,
  );

export const AppLoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [
    isBackendLoading,
    setIsBackendLoading,
  ] = useState(false);

  const startBackendLoading =
    useCallback(() => {
      setIsBackendLoading(true);
    }, []);

  const stopBackendLoading =
    useCallback(() => {
      setIsBackendLoading(false);
    }, []);

  const value =
    useMemo(
      () => ({
        isBackendLoading,
        startBackendLoading,
        stopBackendLoading,
      }),
      [
        isBackendLoading,
        startBackendLoading,
        stopBackendLoading,
      ],
    );

  return (
    <AppLoadingContext.Provider
      value={value}
    >
      {children}
    </AppLoadingContext.Provider>
  );
};

export const useAppLoading = () => {
  const context =
    useContext(
      AppLoadingContext,
    );

  if (!context) {
    throw new Error(
      "useAppLoading must be used inside AppLoadingProvider",
    );
  }

  return context;
};