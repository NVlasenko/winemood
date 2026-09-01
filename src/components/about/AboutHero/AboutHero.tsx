import type { SiteAssets } from "@/types/siteAssets";

import "./AboutHero.scss";

type AboutHeroProps = {
  siteAssets: SiteAssets;
};

export const AboutHero = ({
  siteAssets,
}: AboutHeroProps) => {
  const winePattern =
    siteAssets.shared.pagePatternUrl;

  const bottleImage =
    siteAssets.about.bottleImageUrl;

  return (
    <section className="about-hero">
      {winePattern && (
        <>
          <img
            className="about-hero__pattern about-hero__pattern--left"
            src={winePattern}
            alt=""
            loading="lazy"
            aria-hidden="true"
          />

          <img
            className="about-hero__pattern about-hero__pattern--right"
            src={winePattern}
            alt=""
            loading="lazy"
            aria-hidden="true"
          />
        </>
      )}

      <div className="container">
        <div className="about-hero__content">
          <h1
            className="about-hero__brand"
            aria-hidden="true"
          >
            WineMood
          </h1>

          {bottleImage && (
            <img
              className="about-hero__bottle"
              src={bottleImage}
              alt=""
              aria-hidden="true"
            />
          )}

          <p className="about-hero__text">
            Smart wine discovery platform that helps you explore, compare, and
            understand wines through personalized recommendations and curated
            collections.
          </p>
        </div>
      </div>
    </section>
  );
};