import {
  useEffect,
  useRef,
  useState,
} from "react";

import "./HistoryVideoSection.scss";

type HistoryVideoSectionProps = {
  videoUrl?: string;
};

const HISTORY_VIDEO_TIME_KEY =
  "historyVideoCurrentTime";

const getCloudinaryVideoPoster = (
  videoUrl: string,
) => {
  return videoUrl
    .replace(
      "/video/upload/",
      "/video/upload/so_0,f_webp/",
    )
    .replace(/\.mp4$/i, ".webp");
};

export const HistoryVideoSection = ({
  videoUrl,
}: HistoryVideoSectionProps) => {
  const videoRef =
    useRef<HTMLVideoElement | null>(null);

  const [isVideoReady, setIsVideoReady] =
    useState(false);

  const posterUrl = videoUrl
    ? getCloudinaryVideoPoster(videoUrl)
    : undefined;

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    let isRestoring = false;

    const showVideo = () => {
      setIsVideoReady(true);
    };

    const handleSeeked = () => {
      if (!isRestoring) {
        return;
      }

      isRestoring = false;

      showVideo();
    };

    const restoreVideoTime = () => {
      const savedTime = Number(
        sessionStorage.getItem(
          HISTORY_VIDEO_TIME_KEY,
        ),
      );

      const canRestore =
        Number.isFinite(savedTime) &&
        savedTime > 0 &&
        Number.isFinite(video.duration) &&
        savedTime < video.duration;

      if (!canRestore) {
        showVideo();

        return;
      }

      isRestoring = true;

      video.addEventListener(
        "seeked",
        handleSeeked,
        {
          once: true,
        },
      );

      video.currentTime = savedTime;
    };

    if (video.readyState >= 1) {
      restoreVideoTime();
    } else {
      video.addEventListener(
        "loadedmetadata",
        restoreVideoTime,
        {
          once: true,
        },
      );
    }

    return () => {
      video.removeEventListener(
        "loadedmetadata",
        restoreVideoTime,
      );

      video.removeEventListener(
        "seeked",
        handleSeeked,
      );
    };
  }, [videoUrl]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    sessionStorage.setItem(
      HISTORY_VIDEO_TIME_KEY,
      String(video.currentTime),
    );
  };

  return (
    <section className="history-video-section">
      <div className="container">
        <div className="history-video-section__frame">
          {posterUrl && (
            <img
              className="history-video-section__poster"
              src={posterUrl}
              alt=""
              aria-hidden="true"
            />
          )}

          {videoUrl && (
            <video
              ref={videoRef}
              className={`history-video-section__video ${
                isVideoReady
                  ? "history-video-section__video--ready"
                  : ""
              }`}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              onTimeUpdate={
                handleTimeUpdate
              }
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