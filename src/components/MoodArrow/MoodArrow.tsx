import { useMoodTheme } from '../../context/MoodThemeContext';
import { moodArrows } from '../../data/moodArrows';

import './MoodArrow.scss';

type Props = {
  className?: string;
};

export const MoodArrow = ({ className = '' }: Props) => {
  const { moodTheme } = useMoodTheme();

  return (
    <img
      key={moodTheme}
      className={`mood-arrow ${className}`}
      src={moodArrows[moodTheme]}
      alt="arrow"
    />
  );
};