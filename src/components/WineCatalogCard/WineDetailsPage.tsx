import { Link, useParams } from "react-router-dom";

import { wines } from "../../data/wines";

import "./WineDetailsPage.scss";

export const WineDetailsPage = () => {
  const { id } = useParams();

  const wine = wines.find((item) => item.id === Number(id));

  if (!wine) {
    return (
      <main className="wine-details-page">
        <div className="container">
          <h1 className="wine-details-page__title">Wine not found</h1>

          <Link to="/catalog" className="wine-details-page__back-link">
            Back to catalog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="wine-details-page">
      <div className="container">
        <Link to="/catalog" className="wine-details-page__back-link">
          ← Back to catalog
        </Link>

        <section className="wine-details-page__hero">
          <div className="wine-details-page__image-wrap">
            <span className="wine-details-page__glow" />

            <img
              className="wine-details-page__image"
              src={wine.image}
              alt={wine.name}
            />
          </div>

          <div className="wine-details-page__content">
            <p className="wine-details-page__country">{wine.country.name}</p>

            <h1 className="wine-details-page__title">{wine.name}</h1>

            <p className="wine-details-page__description">{wine.description}</p>

            <div className="wine-details-page__rating">
              <span className="wine-details-page__stars">★★★★★</span>
              <span>{wine.rating} (154)</span>
            </div>

            <div className="wine-details-page__details">
              <div>
                <span>Grape</span>
                <strong>{wine.grapeVariety}</strong>
              </div>

              <div>
                <span>Region</span>
                <strong>{wine.region.name}</strong>
              </div>

              <div>
                <span>Volume</span>
                <strong>{wine.bottleVolume} ml</strong>
              </div>

              <div>
                <span>Alcohol</span>
                <strong>{wine.alcoholByVolume}%</strong>
              </div>

              <div>
                <span>Sweetness</span>
                <strong>
                  {wine.sweetness.toLowerCase().replace("_", "-")}
                </strong>
              </div>

              <div>
                <span>Producer</span>
                <strong>{wine.producer.name}</strong>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
