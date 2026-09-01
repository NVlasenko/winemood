import type { Wine } from "@/types/wine";
import type { WineCatalogCard } from "@/types/wineCatalogCard";
import type { WineReviewDto } from "@/types/reviews";

import { WineHero } from "./sections/WineHero";
import { WineDetailsInfo } from "./sections/WineDetailsInfo";
import { WineReviews } from "./sections/WineReviews";
import { WineFoodPairings } from "./sections/WineFoodPairings";
import { SimilarWines } from "./sections/SimilarWines";

import "./WineDetails.scss";

type Props = {
  wine: Wine;
  pagePatternUrl?: string;
  reviewsBackdropUrl?: string;
  similarWines: WineCatalogCard[];
  wineReviews: WineReviewDto[];
};

export const WineDetails = ({
  wine,
  pagePatternUrl,
  reviewsBackdropUrl,
  similarWines,
  wineReviews,
}: Props) => {
  return (
    <section className="wine-card">
      <WineHero
        wine={wine}
        pagePatternUrl={pagePatternUrl}
      />

      <WineDetailsInfo wine={wine} />

      <WineFoodPairings
        foodPairings={wine.foodPairings}
      />

      <SimilarWines
        wines={similarWines}
      />

      <WineReviews
        wine={wine}
        reviews={wineReviews}
        reviewsBackdropUrl={
          reviewsBackdropUrl
        }
      />
    </section>
  );
};