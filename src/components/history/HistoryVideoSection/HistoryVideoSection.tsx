import { useSiteAssets } from "@/hooks/assets/siteAssets/useSiteAssets";

import "./HistoryVideoSection.scss";

export const HistoryVideoSection = () => {
  const { data: siteAssets } = useSiteAssets();

  const videoUrl =
    siteAssets?.history.videoUrl;

  return (
    <section className="history-video-section">
      <div className="container">
        <div className="history-video-section__frame">
          {videoUrl && (
            <video
              className="history-video-section__video"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source
                src={videoUrl}
                type="video/mp4"
              />

              Your browser does not support the video tag.
            </video>
          )}

          <div className="history-video-section__overlay" />

          <p className="history-video-section__text">
            Wine is not just a drink. It is a story thousands of years old.
          </p>
        </div>
      </div>
    </section>
  );
};