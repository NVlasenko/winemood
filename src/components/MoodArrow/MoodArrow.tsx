import { useMoodTheme } from "../../context/MoodThemeContext";
import { moodArrows } from "../../data/moodArrows";

import "./MoodArrow.scss";

type Props = {
  className?: string;
};

export const MoodArrow = ({ className = "" }: Props) => {
  const { moodTheme } = useMoodTheme();

  const arrowSrc = moodArrows[moodTheme] || moodArrows.default;

  return (
    <img
      key={moodTheme}
      className={`mood-arrow ${className}`}
      src={arrowSrc}
      alt=""
      aria-hidden="true"
    />
  );
};