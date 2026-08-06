import { memo, useCallback } from "react";

import type { MoodCardTheme } from "@/types/mood";
import type { moods } from "@/data/moods";

type MoodCardProps = {
  mood: (typeof moods)[number];
  onMoodClick: (theme: MoodCardTheme) => void;
};

export const MoodCard = memo(({ mood, onMoodClick }: MoodCardProps) => {
  const handleClick = useCallback(() => {
    onMoodClick(mood.theme);
  }, [mood.theme, onMoodClick]);

  return (
    <button
      className="browse-by-mood__card"
      type="button"
      onClick={handleClick}
    >
      <div className="browse-by-mood__card-inner">
        <img
          className="browse-by-mood__card-image"
          src={mood.imageUrl}
          alt={mood.title}
        />

        <div className="browse-by-mood__card-overlay" />

        <h3 className="browse-by-mood__card-title">
          {mood.title}
        </h3>
      </div>
    </button>
  );
});

MoodCard.displayName = "MoodCard";