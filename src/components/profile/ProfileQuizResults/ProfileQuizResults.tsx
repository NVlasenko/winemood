import { useMemo } from "react";

import { SectionTitle } from "@/components/ui/SectionTitle";
import { SectionState } from "@/components/ui/SectionState";
import { WineCatalogCard } from "@/components/catalog/WineCatalogCard";
import { MoodLinkButton } from "@/components/ui/MoodLinkButton";

import { useFavorites } from "@/context/FavoritesContext";

import { useQuizHistory } from "@/hooks/quiz/useQuizHistory";
import { useExpandableSection } from "@/hooks/ui/useExpandableSection";

import type { QuizHistoryItem } from "@/types/quizProfile";

import "./ProfileQuizResults.scss";

const INITIAL_VISIBLE_COUNT = 1;

const formatQuizDate = (
  value: string,
) => {
  return new Intl.DateTimeFormat(
    "en-GB",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "UTC",
    },
  ).format(new Date(value));
};

type ProfileQuizResultsProps = {
  initialQuizHistory: QuizHistoryItem[];
};

export const ProfileQuizResults = ({
  initialQuizHistory,
}: ProfileQuizResultsProps) => {
  const {
    data: history = initialQuizHistory,
    isLoading,
    isError,
  } = useQuizHistory(
    true,
    initialQuizHistory,
  );

  const {
    isFavorite,
    toggleFavorite,
  } = useFavorites();

  const {
    isOpen,
    isVisible,
    titleRef,
    toggleOpen,
  } = useExpandableSection();

  const initialHistory = useMemo(
    () =>
      history.slice(
        0,
        INITIAL_VISIBLE_COUNT,
      ),
    [history],
  );

  const extraHistory = useMemo(
    () =>
      history.slice(
        INITIAL_VISIBLE_COUNT,
      ),
    [history],
  );

  const hasMore =
    extraHistory.length > 0;

  const renderResult = (
    result: QuizHistoryItem,
  ) => {
    return (
      <div
        key={result.id}
        className="profile-quiz-results__block"
      >
        <p className="profile-quiz-results__date">
          {formatQuizDate(
            result.createdAt,
          )}
        </p>

        <div className="profile-quiz-results__grid">
          {result.wines.map(
            (wine, index) => (
              <WineCatalogCard
                key={wine.id}
                wine={wine}
                index={index}
                isFavorite={isFavorite(
                  wine.id,
                )}
                onToggleFavorite={
                  toggleFavorite
                }
              />
            ),
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="profile-quiz-results">
      <div>
        <div
          ref={titleRef}
          className="profile-quiz-results__top"
        >
          <SectionTitle
            title="My Quiz Results"
          />
        </div>

        {isLoading &&
          !history.length && (
            <SectionState
              variant="loading"
              text="Loading quiz results..."
            />
          )}

        {isError &&
          !history.length && (
            <SectionState
              variant="error"
              text="Failed to load quiz results."
            />
          )}

        {!isLoading &&
          !isError &&
          !history.length && (
            <SectionState
              variant="empty"
              text="No quiz results yet."
            />
          )}

        {!!history.length && (
          <>
            <div className="profile-quiz-results__list">
              {initialHistory.map(
                renderResult,
              )}

              {hasMore &&
                isOpen && (
                  <div
                    className={`profile-quiz-results__extra ${
                      isVisible
                        ? "profile-quiz-results__extra--visible"
                        : ""
                    }`}
                  >
                    <div className="profile-quiz-results__extra-inner">
                      {extraHistory.map(
                        renderResult,
                      )}
                    </div>
                  </div>
                )}
            </div>

            {hasMore && (
              <div className="profile-quiz-results__actions">
                <MoodLinkButton
                  className="profile-quiz-results__view-all"
                  text={
                    isOpen
                      ? "Hide Results"
                      : "View All Results"
                  }
                  onClick={
                    toggleOpen
                  }
                />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};