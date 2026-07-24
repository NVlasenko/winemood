import { useMemo, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useFavorites } from "@/context/FavoritesContext";

import "./ProfileFavorites.scss";

import { SectionTitle } from "@/components/ui/SectionTitle";
import { MoodLinkButton } from "@/components/ui/MoodLinkButton";
import { WineCatalogCard } from "@/components/catalog/WineCatalogCard";

const INITIAL_VISIBLE_COUNT = 4;

export const ProfileFavorites = () => {
  const { favoriteWines, isFavorite, toggleFavorite } = useFavorites();

  const [isOpen, setIsOpen] = useState(false);

  const visibleFavorites = useMemo(
    () =>
      isOpen
        ? favoriteWines
        : favoriteWines.slice(0, INITIAL_VISIBLE_COUNT),
    [favoriteWines, isOpen]
  );

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const hasMore = favoriteWines.length > INITIAL_VISIBLE_COUNT;

  if (!favoriteWines.length) return null;

  return (
    <section className="profile-favorites">
      <div className="container">
        <SectionTitle title="My Favorites" />

        <motion.div className="profile-favorites__grid-wrap profile-favorites__top" layout>
          <div className="catalog-page__grid">
            <AnimatePresence mode="popLayout">
              {visibleFavorites.map((wine, index) => (
                <WineCatalogCard
                  key={wine.id}
                  wine={wine}
                  index={index}
                  isFavorite={isFavorite(wine.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {hasMore && (
          <div className="profile-favorites__actions">
            <MoodLinkButton
              className="profile-favorites__view-all"
              text={isOpen ? "Hide Favorites" : "View All Favorites"}
              onClick={toggleOpen}
            />
          </div>
        )}
      </div>
    </section>
  );
};