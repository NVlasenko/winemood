import {
  useEffect,
  useState,
} from "react";

import {
  useNavigation,
} from "react-router";

import "./NavigationLoadingOverlay.scss";

const SHOW_DELAY_MS = 3_000;
const LONG_WAIT_DELAY_MS = 15_000;

export const NavigationLoadingOverlay =
  () => {
    const navigation =
      useNavigation();

    const isNavigating =
      navigation.state !== "idle";

    const [
      isVisible,
      setIsVisible,
    ] = useState(false);

    const [
      isLongWait,
      setIsLongWait,
    ] = useState(false);

    useEffect(() => {
      if (!isNavigating) {
        setIsVisible(false);
        setIsLongWait(false);

        return;
      }

      const showTimer =
        window.setTimeout(() => {
          setIsVisible(true);
        }, SHOW_DELAY_MS);

      const longWaitTimer =
        window.setTimeout(() => {
          setIsLongWait(true);
        }, LONG_WAIT_DELAY_MS);

      return () => {
        window.clearTimeout(
          showTimer,
        );

        window.clearTimeout(
          longWaitTimer,
        );
      };
    }, [isNavigating]);

    if (!isVisible) {
      return null;
    }

    return (
      <div
        className="navigation-loading"
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <div className="navigation-loading__backdrop" />

        <div className="navigation-loading__card">
          <div className="navigation-loading__glow" />

          <div className="navigation-loading__content">
            <div className="navigation-loading__loader">
              <div className="navigation-loading__glass">
                <div className="navigation-loading__wine" />

                <div className="navigation-loading__shine" />
              </div>

              <div className="navigation-loading__shadow" />
            </div>

            <div className="navigation-loading__copy">
              <span className="navigation-loading__eyebrow">
                WineMood
              </span>

              <h2 className="navigation-loading__title">
                {isLongWait
                  ? "Still preparing..."
                  : "Preparing WineMood"}
              </h2>

              {!isLongWait ? (
                <>
                  <p className="navigation-loading__text">
                    We're getting your
                    wine experience ready.
                  </p>

                  <p className="navigation-loading__hint">
                    If you haven't visited
                    in a while, preparation
                    may take up to 3–5
                    minutes.
                  </p>
                </>
              ) : (
                <>
                  <p className="navigation-loading__text">
                    Everything is still
                    loading. You don't need
                    to refresh the page.
                  </p>

                  <p className="navigation-loading__hint">
                    After a longer period of
                    inactivity, preparation
                    can occasionally take a
                    few minutes.
                  </p>
                </>
              )}
            </div>

            <div className="navigation-loading__progress">
              <span className="navigation-loading__progress-dot" />
              <span className="navigation-loading__progress-text">
                Loading your experience
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };