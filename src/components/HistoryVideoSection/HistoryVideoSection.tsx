import "./HistoryVideoSection.scss";
import HistoryVideo from "@/assets/images/videos/history/wine-story.mp4";

export const HistoryVideoSection = () => {
  return (
    <section className="history-video-section">
      <div className="container">
        <div className="history-video-section__frame">
          <video
            className="history-video-section__video"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={HistoryVideo} type="video/mp4" />
          </video>

          <div className="history-video-section__overlay" />

          <p className="history-video-section__text">
            Wine is not just a drink. It is a story thousands of years old.
          </p>
        </div>
      </div>
    </section>
  );
};