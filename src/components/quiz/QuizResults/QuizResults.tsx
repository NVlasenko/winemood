import { useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import type { Wine } from "@/types/wine";
import type { WineCatalogCard as WineCatalogCardType } from "@/types/wineCatalogCard";

import { WineCatalogCard } from "@/components/catalog/WineCatalogCard";
import { SectionTitle } from "@/components/ui/SectionTitle";

import { useAuth } from "@/context/AuthContext";
import { useAuthRequired } from "@/context/AuthRequiredContext";
import { useFavorites } from "@/context/FavoritesContext";
import { useQuizSession } from "@/context/QuizSessionContext";

import { userApi } from "@/shared/api/userApi";

import arrowRightIcon from "@/assets/images/icons/arrow-right.svg";

import "./QuizResults.scss";

type Props = {
  wines: Wine[];
};

const QUIZ_SENT_KEY = "quizSent:v1";

const mapWineToCard = (wine: Wine): WineCatalogCardType => ({
  id: wine.id,
  name: wine.name,
  type: wine.type,
  sweetnessLevel: {
    name: wine.sweetnessLevel.name,
  },
  volumeMl: wine.volumeMl,
  countryName: wine.countryName,
  imageUrl: wine.imageUrl,
  rating: wine.rating,
});

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
  const queryClient = useQueryClient();

  const { favoriteIds, toggleFavorite } = useFavorites();
  const { isAuthenticated } = useAuth();
  const { openAuthRequired } = useAuthRequired();

  const {
    clearQuizResult,
    saveQuizResult,
    clearWineDetailsBackTarget,
    markWineDetailsOpenedFromQuizResults,
  } = useQuizSession();

  const shouldBlockNavigation = !isAuthenticated;

  const favoriteIdsSet = useMemo(
    () => new Set(favoriteIds),
    [favoriteIds]
  );

  const winesForUI = useMemo(
    () => wines.map(mapWineToCard),
    [wines]
  );

  useEffect(() => {
    clearWineDetailsBackTarget();
  }, [clearWineDetailsBackTarget]);

  useEffect(() => {
    if (!shouldBlockNavigation) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof HTMLElement)) return;

      const anchor = target.closest("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const isNewTab =
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        anchor.target === "_blank";

      if (isNewTab) return;

      const isWineCard = Boolean(
        anchor.closest("[data-quiz-result-card]")
      );

      if (isWineCard) {
        markWineDetailsOpenedFromQuizResults();
        return;
      }

      const nextPath = getPathFromAnchor(anchor);
      const currentPath = getCurrentPath();

      if (!nextPath || nextPath === currentPath) return;
      if (isAuthPath(nextPath)) return;

      event.preventDefault();
      event.stopPropagation();

      openAuthRequired({
        title: "Continue with an account",
        text: "If you leave now, your quiz results will not be saved.",
        primaryLabel: "Sign up",
        primaryTo: "/auth?mode=register",
        secondaryLabel: "Log in",
        secondaryTo: "/auth?mode=login",
        continueLabel: "Continue without saving",
        cancelLabel: "Stay here",
        onContinue: () => {
          clearQuizResult();
          sessionStorage.removeItem(QUIZ_SENT_KEY);
          navigate(nextPath);
        },
      });
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [
    shouldBlockNavigation,
    openAuthRequired,
    clearQuizResult,
    markWineDetailsOpenedFromQuizResults,
    navigate,
  ]);

  useEffect(() => {
    if (!wines.length) return;

    const alreadySent = sessionStorage.getItem(QUIZ_SENT_KEY);
    if (alreadySent) return;

    const wineIds = wines.map((w) => w.id);

    if (isAuthenticated) {
      userApi
        .saveQuizResult(wineIds)
        .then(() => {
          sessionStorage.setItem(QUIZ_SENT_KEY, "true");

          queryClient.invalidateQueries({
            queryKey: ["quiz-history"],
          });
        })
        .catch((e) => {
          console.error("Failed to save quiz result", e);
        });
    } else {
      saveQuizResult(wines);
    }
  }, [wines, isAuthenticated, saveQuizResult, queryClient]);

  const handleRestart = () => {
    sessionStorage.removeItem(QUIZ_SENT_KEY);
    clearQuizResult();
    clearWineDetailsBackTarget();
    navigate("/quiz");
  };

  return (
    <main className="quiz-results">
      <div className="container">
        <div className="quiz-results__content">

          <div className="quiz-results__top">
            <Link to="/" className="quiz-results__back">
              <img src={arrowRightIcon} alt="" />
              <span>Home</span>
            </Link>
          </div>

          <section className="quiz-results__hero">
            <SectionTitle title="Your Wine Matches" />
            <p className="quiz-results__description">
              Based on your answers, we selected wines for you.
            </p>
          </section>

          <section className="quiz-results__recommendations">
            <h2 className="quiz-results__section-title">
              Wines you might enjoy
            </h2>

            {winesForUI.length > 0 ? (
              <>
                <div className="quiz-results__grid">
                  {winesForUI.map((wine, index) => (
                    <div
                      key={wine.id}
                      className="quiz-results__card"
                      data-quiz-result-card
                    >
                      <WineCatalogCard
                        wine={wine}
                        index={index}
                        isFavorite={favoriteIdsSet.has(wine.id)}
                        onToggleFavorite={toggleFavorite}
                      />
                    </div>
                  ))}
                </div>

                <div className="quiz-results__actions">
                  <button
                    className="quiz-results__try-again"
                    onClick={handleRestart}
                  >
                    Try Again
                  </button>

                  <Link to="/catalog" className="quiz-results__all-wines">
                    <span>All wines</span>
                    <img src={arrowRightIcon} alt="" />
                  </Link>
                </div>
              </>
            ) : (
              <div className="quiz-results__empty">
                <h3>No recommendations found</h3>
                <p>Try again</p>
              </div>
            )}
          </section>

        </div>
      </div>
    </main>
  );
};