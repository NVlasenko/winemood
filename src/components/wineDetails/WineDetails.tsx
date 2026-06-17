import type { Wine } from "@/types/wine";
import "./WineDetails.scss";
import { WineHero } from "./sections/WineHero";
import { WineDetailsInfo } from "./sections/WineDetailsInfo";
import { WineReviews } from "./sections/WineReviews";
import { WineFoodPairings } from "./sections/WineFoodPairings";

type Props = {
  wine: Wine;
};

export const WineDetails = ({ wine }: Props) => {
  return (
    <section className="wine-card">
      <WineHero wine={wine} />
      <WineDetailsInfo wine={wine} />
      <WineFoodPairings foodPairings={wine.foodPairings} />
      <WineReviews wine={wine} />
    </section>
  );
};