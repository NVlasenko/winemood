import { useMoodTheme } from "@/context/MoodThemeContext";

import { useHistoryWomanImages } from "@/hooks/assets/history/useHistoryWomanImages";

import type { HistoryWomanImages } from "@/types/historyWomanImages";

import "./HistoryHero.scss";
import { useSiteAssets } from "@/hooks/assets/siteAssets/useSiteAssets";

export const HistoryHero = () => {
  const { moodTheme } = useMoodTheme();

  const {
    data: womanImages,
    isLoading: isWomanImagesLoading,
    isError: isWomanImagesError,
  } = useHistoryWomanImages();

  const {
    data: siteAssets,
    isLoading: isSiteAssetsLoading,
    isError: isSiteAssetsError,
  } = useSiteAssets();

  const womanImage =
    womanImages?.[
      moodTheme as keyof HistoryWomanImages
    ] ?? womanImages?.default;

  const winePattern =
    siteAssets?.shared.pagePatternUrl;

  return (
    <section className="history-hero">
      {!isSiteAssetsLoading &&
        !isSiteAssetsError &&
        winePattern && (
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
            {!isWomanImagesLoading &&
              !isWomanImagesError &&
              womanImage && (
                <img
                  className="history-hero__image"
                  src={womanImage}
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