import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { AccountRequiredModal } from "@/components/ui/AccountRequiredModal";

type AuthRequiredModalOptions = {
  title?: string;
  text?: string;

  primaryLabel?: string;
  primaryTo?: string;

  secondaryLabel?: string;
  secondaryTo?: string;

  continueLabel?: string;
  cancelLabel?: string;

  onContinue?: () => void;
  onCancel?: () => void;
};

type AuthRequiredContextType = {
  openAuthRequired: (options?: AuthRequiredModalOptions) => void;
  closeAuthRequired: () => void;
};

type Props = {
  children: ReactNode;
};

const DEFAULT_OPTIONS: Required<
  Pick<
    AuthRequiredModalOptions,
    | "title"
    | "text"
    | "primaryLabel"
    | "primaryTo"
    | "secondaryLabel"
    | "secondaryTo"
  >
> = {
  title: "Continue with an account",
  text: "Please sign up or log in to continue and access all features",

  primaryLabel: "Sign up",
  primaryTo: "/auth?mode=register",

  secondaryLabel: "Log in",
  secondaryTo: "/auth?mode=login",
};

const AuthRequiredContext = createContext<AuthRequiredContextType | null>(null);

export const AuthRequiredProvider = ({ children }: Props) => {
  const [modalOptions, setModalOptions] =
    useState<AuthRequiredModalOptions | null>(null);

  const openAuthRequired = useCallback(
    (options: AuthRequiredModalOptions = {}) => {
      setModalOptions(options);
    },
    [],
  );

  const closeAuthRequired = useCallback(() => {
    setModalOptions(null);
  }, []);

  const handleContinue = useCallback(() => {
    const callback = modalOptions?.onContinue;

    setModalOptions(null);

    callback?.();
  }, [modalOptions]);

  const handleCancel = useCallback(() => {
    const callback = modalOptions?.onCancel;

    setModalOptions(null);

    callback?.();
  }, [modalOptions]);

  const value = useMemo(
    () => ({
      openAuthRequired,
      closeAuthRequired,
    }),
    [closeAuthRequired, openAuthRequired],
  );

  const isOpen = modalOptions !== null;

  return (
    <AuthRequiredContext.Provider value={value}>
      {children}

      <AccountRequiredModal
        isOpen={isOpen}
        title={modalOptions?.title ?? DEFAULT_OPTIONS.title}
        text={modalOptions?.text ?? DEFAULT_OPTIONS.text}
        primaryLabel={
          modalOptions?.primaryLabel ?? DEFAULT_OPTIONS.primaryLabel
        }
        primaryTo={modalOptions?.primaryTo ?? DEFAULT_OPTIONS.primaryTo}
        secondaryLabel={
          modalOptions?.secondaryLabel ?? DEFAULT_OPTIONS.secondaryLabel
        }
        secondaryTo={modalOptions?.secondaryTo ?? DEFAULT_OPTIONS.secondaryTo}
        continueLabel={modalOptions?.continueLabel}
        cancelLabel={modalOptions?.cancelLabel}
        onClose={closeAuthRequired}
        onContinue={
          modalOptions?.onContinue ? handleContinue : undefined
        }
        onCancel={modalOptions?.onCancel ? handleCancel : undefined}
      />
    </AuthRequiredContext.Provider>
  );
};

export const useAuthRequired = () => {
  const context = useContext(AuthRequiredContext);

  if (!context) {
    throw new Error(
      "useAuthRequired must be used inside AuthRequiredProvider",
    );
  }

  return context;
};