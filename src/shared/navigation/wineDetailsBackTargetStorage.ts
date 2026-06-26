const WINE_DETAILS_BACK_TARGET_KEY = "wineDetailsBackTarget";

type WineDetailsBackTarget = {
  to: string;
  label: string;
};

const QUIZ_RESULTS_BACK_TARGET: WineDetailsBackTarget = {
  to: "/quiz",
  label: "Quiz results",
};

export const markWineDetailsOpenedFromQuizResults = () => {
  sessionStorage.setItem(
    WINE_DETAILS_BACK_TARGET_KEY,
    JSON.stringify(QUIZ_RESULTS_BACK_TARGET),
  );
};

export const getWineDetailsBackTarget = (): WineDetailsBackTarget | null => {
  try {
    const savedTarget = sessionStorage.getItem(WINE_DETAILS_BACK_TARGET_KEY);

    if (!savedTarget) {
      return null;
    }

    const parsedTarget = JSON.parse(savedTarget) as WineDetailsBackTarget;

    if (
      !parsedTarget ||
      typeof parsedTarget.to !== "string" ||
      typeof parsedTarget.label !== "string"
    ) {
      sessionStorage.removeItem(WINE_DETAILS_BACK_TARGET_KEY);

      return null;
    }

    return parsedTarget;
  } catch {
    sessionStorage.removeItem(WINE_DETAILS_BACK_TARGET_KEY);

    return null;
  }
};

export const clearWineDetailsBackTarget = () => {
  sessionStorage.removeItem(WINE_DETAILS_BACK_TARGET_KEY);
};