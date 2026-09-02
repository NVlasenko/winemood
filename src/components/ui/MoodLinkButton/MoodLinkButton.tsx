import { memo } from "react";

import { MoodArrow } from "../MoodArrow";

import "./MoodLinkButton.scss";

type Props = {
  text: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export const MoodLinkButton = memo(
  ({
    text,
    onClick,
    className = "",
    type = "button",
    disabled = false,
  }: Props) => {
    return (
      <button
        className={[
          "mood-link-button",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        type={type}
        onClick={onClick}
        disabled={disabled}
      >
        <MoodArrow className="mood-link-button__arrow" />

        <span className="mood-link-button__text">
          {text}
        </span>
      </button>
    );
  },
);