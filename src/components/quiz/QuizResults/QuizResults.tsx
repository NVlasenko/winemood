import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

import type { WineCatalogCard as WineCatalogCardType } from "@/types/wineCatalogCard";

import { WineCatalogCard } from "@/components/catalog/WineCatalogCard";
import { SectionTitle } from "@/components/ui/SectionTitle";

import { useAuth } from "@/context/AuthContext";
import { useAuthRequired } from "@/context/AuthRequiredContext";
import { useFavorites } from "@/context/FavoritesContext";
import { useQuizSession } from "@/context/QuizSessionContext";
import { refetchAchievementsSafe } from "@/shared/lib/refetchAchievementsSafe";

import arrowRightIcon from "@/assets/images/icons/arrow-right.svg";

import "./QuizResults.scss";

type Props = {
  wines: WineCatalogCardType[];
  onRestart: () => void;
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

export const QuizResults = ({ wines, onRestart }: Props) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { width, height } = useWindowSize();

  const { favoriteIds, toggleFavorite } = useFavorites();
  const { isAuthenticated, user, refreshUser } = useAuth();
  const { openAuthRequired } = useAuthRequired();

  const {
    clearQuizResult,
    saveQuizResult,
    clearWineDetailsBackTarget,
    markWineDetailsOpenedFromQuizResults,
  } = useQuizSession();

  const [showConfetti, setShowConfetti] = useState(false);
  const isSavingQuizRef = useRef(false);

  const shouldBlockNavigation = !isAuthenticated;

  const favoriteIdsSet = useMemo(() => new Set(favoriteIds), [favoriteIds]);
  const wineIds = useMemo(() => wines.map((wine) => wine.id), [wines]);

  const quizResultKey = useMemo(
    () => [...wineIds].sort((a, b) => a - b).join("-"),
    [wineIds]
  );

  const quizSentKey = user
    ? `quizSent:v1:${user.id}:${quizResultKey}`
    : `quizSent:v1:guest:${quizResultKey}`;

  useEffect(() => {
    clearWineDetailsBackTarget();
  }, [clearWineDetailsBackTarget]);

  useEffect(() => {
    if (!shouldBlockNavigation) {
      return;
    }

    const handleClick = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof HTMLElement)) {
        return;
      }

      const anchor = target.closest("a");

      if (!(anchor instanceof HTMLAnchorElement)) {
        return;
      }

      const isWineCard = Boolean(anchor.closest("[data-quiz-result-card]"));

      if (isWineCard) {
        markWineDetailsOpenedFromQuizResults();
        return;
      }

      const nextPath = getPathFromAnchor(anchor);
      const currentPath = getCurrentPath();

      if (!nextPath || nextPath === currentPath) {
        return;
      }

      if (isAuthPath(nextPath)) {
        return;
      }

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

          sessionStorage.removeItem(quizSentKey);

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
    quizSentKey,
  ]);

  useEffect(() => {
    if (!wines.length) {
      return;
    }

    const send = async () => {
      if (!isAuthenticated || !user) {
        saveQuizResult(wines);
        return;
      }

      const alreadySent = sessionStorage.getItem(quizSentKey);

      if (alreadySent === "sending") {
        return;
      }

      if (alreadySent === "sent") {
        return;
      }

      if (isSavingQuizRef.current) {
        return;
      }

      isSavingQuizRef.current = true;

      sessionStorage.setItem(quizSentKey, "sending");

      try {
        sessionStorage.setItem(quizSentKey, "sent");

        await queryClient.invalidateQueries({
          queryKey: ["quiz-history", user.id],
        });

        await refetchAchievementsSafe(queryClient, user.id);

        await refreshUser();

        setShowConfetti(true);

        setTimeout(() => {
          setShowConfetti(false);
        }, 2000);
      } catch (error) {
        sessionStorage.removeItem(quizSentKey);

        console.error("Failed to save quiz result", error);
      } finally {
        isSavingQuizRef.current = false;
      }
    };

    send();
  }, [
    wines,
    isAuthenticated,
    user?.id,
    saveQuizResult,
    queryClient,
    quizSentKey,
    refreshUser,
  ]);

  const handleRestart = () => {
    onRestart();
  };

  return (
    <>
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={250}
          recycle={false}
        />
      )}

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
                      isFavorite={favoriteIdsSet.has(wine.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  </div>
                ))}
              </div>

              <div className="quiz-results__actions">
                <button
                  className="quiz-results__try-again"
                  type="button"
                  onClick={handleRestart}
                >
                  Try Again
                </button>

                <Link to="/catalog" className="quiz-results__all-wines">
                  <span>All wines</span>

                  <img src={arrowRightIcon} alt="" />
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
};
