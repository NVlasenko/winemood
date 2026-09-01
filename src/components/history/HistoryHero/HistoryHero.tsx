import { useMoodTheme } from "@/context/MoodThemeContext";

import type { HistoryWomanImages } from "@/types/historyWomanImages";
import type { SiteAssets } from "@/types/siteAssets";

import { optimizeCloudinaryImage } from "@/shared/lib/optimizeCloudinaryImage";

import "./HistoryHero.scss";

type HistoryHeroProps = {
  womanImages?: HistoryWomanImages;
  siteAssets?: SiteAssets;
};

export const HistoryHero = ({
  womanImages,
  siteAssets,
}: HistoryHeroProps) => {
  const { moodTheme } = useMoodTheme();

  const womanImage =
    womanImages?.[
      moodTheme as keyof HistoryWomanImages
    ] ?? womanImages?.default;

  const optimizedWomanImage =
    womanImage
      ? optimizeCloudinaryImage(
          womanImage,
          { width: 700 },
        )
      : undefined;

  const winePattern =
    siteAssets?.shared.pagePatternUrl;

  return (
    <section className="history-hero">
      {winePattern && (
        <>
          <img
            className="history-hero__pattern history-hero__pattern--left"
            src={winePattern}
            alt=""
            aria-hidden="true"
          />

          <img
            className="history-hero__pattern history-hero__pattern--right"
            src={winePattern}
            alt=""
            aria-hidden="true"
          />
        </>
      )}

      <div className="container">
        <div className="history-hero__content">
          <h1 className="history-hero__title">
            Where Wine Began
          </h1>

          <div className="history-hero__image-wrapper">
            {optimizedWomanImage && (
              <img
                className="history-hero__image"
                src={optimizedWomanImage}
                alt=""
                aria-hidden="true"
              />
            )}
          </div>

          <p className="history-hero__text">
            Wine is more than a drink. It is thousands of years of culture,
            traditions, discoveries and passion
          </p>
        </div>
      </div>
    </section>
  );
};