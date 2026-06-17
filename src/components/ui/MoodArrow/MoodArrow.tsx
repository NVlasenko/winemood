import { useMoodTheme } from "@/context/MoodThemeContext";
import { moodArrowIcons } from "./config/moodArrows";

import "./MoodArrow.scss";

type Props = {
  className?: string;
};

export const MoodArrow = ({ className = "" }: Props) => {
  const { moodTheme } = useMoodTheme();

  return (
    <img
      className={`mood-arrow ${className}`}
      src={moodArrowIcons[moodTheme]}
      alt=""
      aria-hidden="true"
    />
  );
};