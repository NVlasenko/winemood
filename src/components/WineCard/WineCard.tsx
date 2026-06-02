import { WineHero } from "./sections/WineHero/WineHero";
import { WineDetailsInfo } from "./sections/WineDetailsInfo/WineDetailsInfo";
import type { Wine } from "../../types/wine";
import "./WineCard.scss";
import { WineReviews } from "./sections/WineReviews/WineReviews";

type Props = {
  wine: Wine;
};

export const WineCard = ({ wine }: Props) => {
  return (
    <section className="wine-card">
      <WineHero wine={wine} />

      <WineDetailsInfo wine={wine} />

      <WineReviews wine={wine} />
    </section>
  );
};