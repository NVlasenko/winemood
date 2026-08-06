import { useMemo, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { SectionTitle } from "@/components/ui/SectionTitle";
import { WineCatalogCard } from "@/components/catalog/WineCatalogCard";
import { MoodLinkButton } from "@/components/ui/MoodLinkButton";

import { useAuth } from "@/context/AuthContext";
import { useFavorites } from "@/context/FavoritesContext";

import { useQuizHistory } from "@/hooks/quiz/useQuizHistory";

import "./ProfileQuizResults.scss";

const INITIAL_VISIBLE_COUNT = 1;

export const ProfileQuizResults = () => {
  const { user } = useAuth();

  const {
    data: history = [],
    isLoading,
    isError,
  } = useQuizHistory(!!user);

  const { isFavorite, toggleFavorite } = useFavorites();

  const [isOpen, setIsOpen] = useState(false);

  const visibleHistory = useMemo(() => {
    return isOpen ? history : history.slice(0, INITIAL_VISIBLE_COUNT);
  }, [history, isOpen]);

  const hasMore = history.length > INITIAL_VISIBLE_COUNT;

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  if (!user) return null;

  if (isLoading) {
    return (
      <section className="profile-quiz-results">
        <SectionTitle title="My Quiz Results" />
        <p className="profile-quiz-results__loader">Loading...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="profile-quiz-results">
        <SectionTitle title="My Quiz Results" />
        <p className="profile-quiz-results__error">
          Failed to load quiz results
        </p>
      </section>
    );
  }

  if (!history.length) {
    return (
      <section className="profile-quiz-results">
        <SectionTitle title="My Quiz Results" />
        <p className="profile-quiz-results__empty">
          You haven’t taken the quiz yet
        </p>
      </section>
    );
  }

  return (
    <section className="profile-quiz-results">
      <div className="profile-quiz-results__top">
        <SectionTitle title="My Quiz Results" />
      </div>

      <motion.div
        className="profile-quiz-results__list"
        layout
      >
        <AnimatePresence mode="popLayout">
          {visibleHistory.map((result) => (
            <motion.div
              key={result.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="profile-quiz-results__block"
            >
              <p className="profile-quiz-results__date">
                {new Date(result.createdAt).toLocaleDateString()}
              </p>

              <motion.div
                className="profile-quiz-results__grid"
                layout="position"
              >
                {result.wines.map((wine, index) => (
                  <motion.div key={wine.id} layout>
                    <WineCatalogCard
                      wine={wine}
                      index={index}
                      isFavorite={isFavorite(wine.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {hasMore && (
        <div className="profile-quiz-results__actions">
          <MoodLinkButton
            className="profile-quiz-results__view-all"
            text={isOpen ? "Hide Results" : "View All Results"}
            onClick={toggleOpen}
          />
        </div>
      )}
    </section>
  );
};