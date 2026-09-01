import { useMemo } from "react";

import { useFavorites } from "@/context/FavoritesContext";

import type { WineCatalogCard as WineCatalogCardType } from "@/types/wineCatalogCard";

import { SectionTitle } from "@/components/ui/SectionTitle";
import { MoodLinkButton } from "@/components/ui/MoodLinkButton";
import { WineCatalogCard } from "@/components/catalog/WineCatalogCard";

import { useExpandableSection } from "@/hooks/ui/useExpandableSection";

import "./ProfileFavorites.scss";

const INITIAL_VISIBLE_COUNT = 4;

type ProfileFavoritesProps = {
  initialFavoriteWines: WineCatalogCardType[];
};

export const ProfileFavorites = ({
  initialFavoriteWines,
}: ProfileFavoritesProps) => {
  const {
    favoriteWines,
    hasLoadedFavorites,
    isFavorite,
    toggleFavorite,
  } = useFavorites();

  const {
    isOpen,
    isVisible,
    titleRef,
    toggleOpen,
  } = useExpandableSection();

  const displayedFavorites =
    hasLoadedFavorites
      ? favoriteWines
      : initialFavoriteWines;

  const initialFavorites = useMemo(
    () =>
      displayedFavorites.slice(
        0,
        INITIAL_VISIBLE_COUNT,
      ),
    [displayedFavorites],
  );

  const extraFavorites = useMemo(
    () =>
      displayedFavorites.slice(
        INITIAL_VISIBLE_COUNT,
      ),
    [displayedFavorites],
  );

  const hasMore =
    extraFavorites.length > 0;

  if (!displayedFavorites.length) {
    return null;
  }

  return (
    <section className="profile-favorites">
      <div className="container">
        <div
          ref={titleRef}
          className="profile-favorites__top"
        >
          <SectionTitle title="My Favorites" />
        </div>

        <div className="profile-favorites__list">
          <div className="profile-favorites__grid">
            {initialFavorites.map(
              (wine, index) => (
                <WineCatalogCard
                  key={wine.id}
                  wine={wine}
                  index={index}
                  isFavorite={
                    hasLoadedFavorites
                      ? isFavorite(wine.id)
                      : true
                  }
                  onToggleFavorite={
                    toggleFavorite
                  }
                />
              ),
            )}
          </div>

          {hasMore && isOpen && (
            <div
              className={`profile-favorites__extra ${
                isVisible
                  ? "profile-favorites__extra--visible"
                  : ""
              }`}
            >
              <div className="profile-favorites__grid">
                {extraFavorites.map(
                  (wine, index) => (
                    <WineCatalogCard
                      key={wine.id}
                      wine={wine}
                      index={
                        index +
                        INITIAL_VISIBLE_COUNT
                      }
                      isFavorite={
                        hasLoadedFavorites
                          ? isFavorite(
                              wine.id,
                            )
                          : true
                      }
                      onToggleFavorite={
                        toggleFavorite
                      }
                    />
                  ),
                )}
              </div>
            </div>
          )}
        </div>

        {hasMore && (
          <div className="profile-favorites__actions">
            <MoodLinkButton
              className="profile-favorites__view-all"
              text={
                isOpen
                  ? "Hide Favorites"
                  : "View All Favorites"
              }
              onClick={toggleOpen}
            />
          </div>
        )}
      </div>
    </section>
  );
};