import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import type { Wine } from "@/types/wine";

import { WineCatalogCard } from "@/components/catalog/WineCatalogCard";
import { SectionTitle } from "@/components/ui/SectionTitle";

import { useFavorites } from "@/context/FavoritesContext";
import { useQuizSession } from "@/context/QuizSessionContext";
import { useAuth } from "@/context/AuthContext";
import { useAuthRequired } from "@/context/AuthRequiredContext";

import arrowRightIcon from "@/assets/images/icons/arrow-right.svg";

import "./QuizResults.scss";

type Props = {
  wines: Wine[];
};

const isAuthPath = (path: string) => path.startsWith("/auth");

const getPathFromAnchor = (anchor: HTMLAnchorElement) => {
  const url = new URL(anchor.href);

  if (url.hash.startsWith("#/")) {
    return url.hash.slice(1);
  }

  return `${url.pathname}${url.search}`;
};

const getCurrentPath = () => {
  if (window.location.hash.startsWith("#/")) {
    return window.location.hash.slice(1);
  }

  return `${window.location.pathname}${window.location.search}`;
};

export const QuizResults = ({ wines }: Props) => {
  const navigate = useNavigate();

  const { favorites, toggleFavorite } = useFavorites();

  const {
    clearQuizResult,
    clearWineDetailsBackTarget,
    markWineDetailsOpenedFromQuizResults,
  } = useQuizSession();

  const { isAuthenticated } = useAuth();
  const { openAuthRequired } = useAuthRequired();

  const shouldBlockNavigation = !isAuthenticated;

  // очищаем back target
  useEffect(() => {
    clearWineDetailsBackTarget();
  }, [clearWineDetailsBackTarget]);

  useEffect(() => {
    if (!shouldBlockNavigation) {
      return;
    }

    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof HTMLElement)) return;

      const anchor = target.closest("a");

      if (!(anchor instanceof HTMLAnchorElement)) return;

      // новые вкладки не трогаем
      if (
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        anchor.target === "_blank"
      ) {
        return;
      }

      const isWineCardNavigation = Boolean(
        anchor.closest("[data-quiz-result-card]")
      );

      if (isWineCardNavigation) {
        markWineDetailsOpenedFromQuizResults();
        return;
      }

      const nextPath = getPathFromAnchor(anchor);
      const currentPath = getCurrentPath();

      if (!nextPath || nextPath === currentPath) return;

      if (isAuthPath(nextPath)) return;

      // 🚨 БЛОКИРУЕМ переход
      event.preventDefault();
      event.stopPropagation();

      openAuthRequired({
        title: "Continue with an account",
        text: "If you leave now, your quiz results will not be saved. Sign up or log in to keep your wine matches in your profile.",

        continueLabel: "Continue without saving",
        cancelLabel: "Back to quiz results",

        onContinue: () => {
          clearQuizResult();
          clearWineDetailsBackTarget();
          navigate(nextPath);
        },
      });
    };

    document.addEventListener("click", handleDocumentClick, true);

    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
    };
  }, [
    shouldBlockNavigation,
    markWineDetailsOpenedFromQuizResults,
    openAuthRequired,
    clearQuizResult,
    clearWineDetailsBackTarget,
    navigate,
  ]);

  return (
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
  );
};