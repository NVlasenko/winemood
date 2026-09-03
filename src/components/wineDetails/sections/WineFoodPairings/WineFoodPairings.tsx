import type { FoodPairing } from "@/types/food";

import { SectionTitle } from "@/components/ui/SectionTitle";

import { FOOD_PAIRING_BACKGROUND_CLASSES } from "./config/foodPairingBackgrounds";

import "./WineFoodPairings.scss";

type Props = {
  foodPairings: FoodPairing[];
};

const MAX_VISIBLE_FOOD_PAIRINGS = 4;

const isValidImageUrl = (imageUrl?: string) => {
  return Boolean(imageUrl && imageUrl.trim() && imageUrl !== "string");
};

const getBackgroundClassName = (foodPairing: FoodPairing, index: number) => {
  const backgroundIndex =
    Math.abs(foodPairing.id + index) % FOOD_PAIRING_BACKGROUND_CLASSES.length;

  return FOOD_PAIRING_BACKGROUND_CLASSES[backgroundIndex];
};

export const WineFoodPairings = ({ foodPairings }: Props) => {
  const visibleFoodPairings = foodPairings.slice(0, MAX_VISIBLE_FOOD_PAIRINGS);

  if (!visibleFoodPairings.length) {
    return null;
  }

  return (
    <section className="wine-food-pairings">
      <div className="container">
        <SectionTitle title="Food Pairing" />

        <div className="wine-food-pairings__grid">
          {visibleFoodPairings.map((foodPairing, index) => {
            const backgroundClassName = getBackgroundClassName(
              foodPairing,
              index,
            );

            const title = foodPairing.name;

            return (
              <article
                className={`wine-food-pairings__card ${backgroundClassName}`}
                key={`${foodPairing.id}-${foodPairing.name}`}
              >
                <div className="wine-food-pairings__image-wrap">
                  {isValidImageUrl(foodPairing.foodImageUrl) ? (
                    <img
                      className="wine-food-pairings__image"
                      src={foodPairing.foodImageUrl}
                      alt={title}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="wine-food-pairings__image-placeholder">
                      {title}
                    </div>
                  )}
                </div>

                <h3 className="wine-food-pairings__title">{title}</h3>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};