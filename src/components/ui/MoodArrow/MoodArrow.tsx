import MoodArrowIcon from "@/assets/images/moods/mood-arrows/arrow-default.svg?react";
import "./MoodArrow.scss";

type Props = {
  className?: string;
};

export const MoodArrow = ({ className = "" }: Props) => {
  return (
    <MoodArrowIcon
      className={`mood-arrow ${className}`}
      aria-hidden="true"
      focusable="false"
    />
  );
};