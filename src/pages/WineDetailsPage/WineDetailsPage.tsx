import { useParams } from "react-router-dom";
import { WineCard } from "../../components/WineCard/WineCard";
import { wines } from "../../data/wines";
import "./WineDetailsPage.scss";

export const WineDetailsPage = () => {
  const { id } = useParams();

  const wine = wines.find((item) => item.id === Number(id));

  if (!wine) {
    return (
      <main className="wine-details-page">
        <div className="wine-details-page__empty">
          <h1 className="wine-details-page__title">Wine not found</h1>

          <p className="wine-details-page__text">
            This wine does not exist or has been removed.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="wine-details-page">
      <WineCard wine={wine} />
    </main>
  );
};