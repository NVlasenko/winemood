import { useMemo } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SectionState } from "@/components/ui/SectionState";
import { WineCatalogCard } from "@/components/catalog/WineCatalogCard";
import { MoodLinkButton } from "@/components/ui/MoodLinkButton";

import { useAuth } from "@/context/AuthContext";
import { useFavorites } from "@/context/FavoritesContext";

import { useQuizHistory } from "@/hooks/quiz/useQuizHistory";
import { useExpandableSection } from "@/hooks/ui/useExpandableSection";

import "./ProfileQuizResults.scss";

const INITIAL_VISIBLE_COUNT = 1;

export const ProfileQuizResults = () => {
  const { user } = useAuth();

  const { data: history = [], isLoading, isError } = useQuizHistory(!!user);

  const { isFavorite, toggleFavorite } = useFavorites();

  const { isOpen, isVisible, titleRef, toggleOpen } = useExpandableSection();

  const initialHistory = useMemo(
    () => history.slice(0, INITIAL_VISIBLE_COUNT),
    [history]
  );

  const extraHistory = useMemo(
    () => history.slice(INITIAL_VISIBLE_COUNT),
    [history]
  );

  const hasMore = extraHistory.length > 0;

  if (!user) {
    return null;
  }

  const renderResult = (result: (typeof history)[number]) => {
    return (
      <div key={result.id} className="profile-quiz-results__block">
        <p className="profile-quiz-results__date">
          {new Date(result.createdAt).toLocaleDateString()}
        </p>

        <div className="profile-quiz-results__grid">
          {result.wines.map((wine, index) => (
            <WineCatalogCard
              key={wine.id}
              wine={wine}
              index={index}
              isFavorite={isFavorite(wine.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="profile-quiz-results">
      <div>
        <div ref={titleRef} className="profile-quiz-results__top">
          <SectionTitle title="My Quiz Results" />
        </div>

        {isLoading && (
          <SectionState variant="loading" text="Loading quiz results..." />
        )}

        {isError && !isLoading && (
          <SectionState variant="error" text="Failed to load quiz results." />
        )}

        {!isLoading && !isError && !history.length && (
          <SectionState variant="empty" text="No quiz results yet." />
        )}

        {!isLoading && !isError && !!history.length && (
          <>
            <div className="profile-quiz-results__list">
              {initialHistory.map(renderResult)}

              {hasMore && isOpen && (
                <div
                  className={`profile-quiz-results__extra ${
                    isVisible ? "profile-quiz-results__extra--visible" : ""
                  }`}
                >
                  <div className="profile-quiz-results__extra-inner">
                    {extraHistory.map(renderResult)}
                  </div>
                </div>
              )}
            </div>

            {hasMore && (
              <div className="profile-quiz-results__actions">
                <MoodLinkButton
                  className="profile-quiz-results__view-all"
                  text={isOpen ? "Hide Results" : "View All Results"}
                  onClick={toggleOpen}
                />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};
