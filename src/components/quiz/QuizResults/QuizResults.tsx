import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import type { Wine } from "@/types/wine";

import { WineCatalogCard } from "@/components/catalog/WineCatalogCard";

import { AccountRequiredModal } from "@/components/ui/AccountRequiredModal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { useFavorites } from "@/context/FavoritesContext";

import arrowRightIcon from "@/assets/images/icons/arrow-right.svg";

import "./QuizResults.scss";
import { useQuizSession } from "@/context/QuizSessionContext";

type Props = {
  wines: Wine[];
};

const AUTH_ROUTES = ["/login", "/registration", "/sign-up", "/signup"];

const getPathFromAnchor = (anchor: HTMLAnchorElement) => {
  const url = new URL(anchor.href);

  if (url.hash.startsWith("#/")) {
    return url.hash.slice(1);
  }

  return url.pathname;
};

const getCurrentPath = () => {
  if (window.location.hash.startsWith("#/")) {
    return window.location.hash.slice(1);
  }

  return window.location.pathname;
};

export const QuizResults = ({ wines }: Props) => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavorites();

  const {
    clearQuizResult,
    clearWineDetailsBackTarget,
    markWineDetailsOpenedFromQuizResults,
  } = useQuizSession();

  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [pendingPath, setPendingPath] = useState<string | null>(null);

  // Потом заменишь на реальный AuthContext.
  const isAuthenticated = false;

  const shouldShowAccountModal = !isAuthenticated;

  const handleBackToResults = useCallback(() => {
    setIsAccountModalOpen(false);
    setPendingPath(null);
  }, []);

  const handleContinueWithoutSaving = useCallback(() => {
    if (!pendingPath) {
      return;
    }

    clearQuizResult();
    clearWineDetailsBackTarget();

    setIsAccountModalOpen(false);
    setPendingPath(null);

    navigate(pendingPath);
  }, [clearQuizResult, clearWineDetailsBackTarget, navigate, pendingPath]);

  useEffect(() => {
    clearWineDetailsBackTarget();
  }, [clearWineDetailsBackTarget]);

  useEffect(() => {
    if (!shouldShowAccountModal) {
      return;
    }

    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof HTMLElement)) {
        return;
      }

      const anchor = target.closest("a");

      if (!(anchor instanceof HTMLAnchorElement)) {
        return;
      }

      const isNewTabClick =
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        anchor.target === "_blank";

      if (isNewTabClick) {
        return;
      }

      const isWineCardNavigation = Boolean(
        anchor.closest("[data-quiz-result-card]"),
      );

      if (isWineCardNavigation) {
        markWineDetailsOpenedFromQuizResults();

        return;
      }

      const nextPath = getPathFromAnchor(anchor);
      const currentPath = getCurrentPath();

      if (!nextPath || nextPath === currentPath) {
        return;
      }

      if (AUTH_ROUTES.includes(nextPath)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      setPendingPath(nextPath);
      setIsAccountModalOpen(true);
    };

    document.addEventListener("click", handleDocumentClick, true);

    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
    };
  }, [markWineDetailsOpenedFromQuizResults, shouldShowAccountModal]);

  return (
    <>
      <main className="quiz-results">
        <div className="container">
          <div className="quiz-results__content">
            <div className="quiz-results__top">
              <Link to="/" className="quiz-results__back">
                <img src={arrowRightIcon} alt="" aria-hidden="true" />
                <span>Home</span>
              </Link>
            </div>

            <section className="quiz-results__hero">
              <SectionTitle title="Your Wine Matches" />

              <p className="quiz-results__description">
                Based on your answers, we selected wines that may match your
                taste, mood, and preferences.
              </p>
            </section>

            <section className="quiz-results__recommendations">
              <h2 className="quiz-results__section-title">
                Wines you might enjoy
              </h2>

              {wines.length > 0 ? (
                <>
                  <div className="quiz-results__grid">
                    {wines.map((wine, index) => (
                      <div
                        key={wine.id}
                        className="quiz-results__card"
                        data-quiz-result-card
                      >
                        <WineCatalogCard
                          wine={wine}
                          index={index}
                          isFavorite={favorites.includes(wine.id)}
                          onToggleFavorite={toggleFavorite}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="quiz-results__actions">
                    <Link to="/catalog" className="quiz-results__all-wines">
                      <span>All wines</span>

                      <img
                        className="quiz-results__all-wines-icon"
                        src={arrowRightIcon}
                        alt=""
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </>
              ) : (
                <div className="quiz-results__empty">
                  <h3 className="quiz-results__empty-title">
                    No recommendations found
                  </h3>

                  <p className="quiz-results__empty-text">
                    Try changing your answers and passing the quiz again.
                  </p>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      <AccountRequiredModal
        isOpen={isAccountModalOpen}
        title="Continue with an account"
        text="If you leave now, your quiz results will not be saved. Sign up or log in to keep your wine matches in your profile."
        primaryLabel="Sign up"
        primaryTo="/registration"
        secondaryLabel="Log in"
        secondaryTo="/login"
        continueLabel="Continue without saving"
        cancelLabel="Back to quiz results"
        onClose={handleBackToResults}
        onContinue={handleContinueWithoutSaving}
        onCancel={handleBackToResults}
      />
    </>
  );
};