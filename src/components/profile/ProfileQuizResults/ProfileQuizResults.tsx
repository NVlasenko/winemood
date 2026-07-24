import { WineCatalogCard } from "@/components/catalog/WineCatalogCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { useFavorites } from "@/context/FavoritesContext";
import { useQuizSession } from "@/context/QuizSessionContext";

import "./ProfileQuizResults.scss";
import { useQuizHistory } from "@/hooks/quiz/useQuizHistory";

export const ProfileQuizResults = () => {
  const { data: wines = [], isLoading, isError } = useQuizHistory();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { hasQuizResult, quizResult } = useQuizSession();

  if (isLoading) {
    return (
      <section className="profile-quiz-results">
        <div className="profile-quiz-results__top">
          <SectionTitle title="Your Quiz Results" />
        </div>
        <p className="profile-quiz-results__loader">Loading...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="profile-quiz-results">
        <div className="profile-quiz-results__top">
          <SectionTitle title="Your Quiz Results" />
        </div>
        <p className="profile-quiz-results__error">
          Failed to load quiz results
        </p>
      </section>
    );
  }

  if (!hasQuizResult) {
    return null; 
  }

  const winesToShow = wines.length ? wines : quizResult ?? [];

  if (!winesToShow.length) {
    return (
      <section className="profile-quiz-results">
        <div className="profile-quiz-results__top">
          <SectionTitle title="Your Quiz Results" />
        </div>
        <p className="profile-quiz-results__empty">
          You haven’t taken the quiz yet
        </p>
      </section>
    );
  }

  return (
    <section className="profile-quiz-results">
      <div className="profile-quiz-results__top">
        <SectionTitle title="Your Quiz Results" />
      </div>

      <div className="profile-quiz-results__grid-wrap">
        <div className="profile-quiz-results__grid">
          {winesToShow.map((wine, index) => (
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
    </section>
  );
};