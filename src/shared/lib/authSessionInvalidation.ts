type AuthSessionInvalidationListener =
  () => void;

const listeners =
  new Set<AuthSessionInvalidationListener>();

let isInvalidated = false;

export const resetAuthSessionInvalidation =
  (): void => {
    isInvalidated = false;
  };

export const subscribeToAuthSessionInvalidation =
  (
    listener:
      AuthSessionInvalidationListener,
  ): (() => void) => {
    listeners.add(listener);

    if (isInvalidated) {
      listener();
    }

    return () => {
      listeners.delete(listener);
    };
  };