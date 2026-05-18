import { MoodArrow } from "../MoodArrow";

import "./MoodLinkButton.scss";

type Props = {
  text: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
};

export const MoodLinkButton = ({
  text,
  onClick,
  className = "",
  type = "button",
}: Props) => {
  return (
    <button
      className={`mood-link-button ${className}`}
      type={type}
      onClick={onClick}
    >
      <MoodArrow className="mood-link-button__arrow" />

      <span className="mood-link-button__text">{text}</span>
    </button>
  );
};
