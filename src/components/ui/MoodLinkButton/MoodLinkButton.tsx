import {
  memo,
  useEffect,
  useRef,
} from "react";

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
    const buttonRef =
      useRef<HTMLButtonElement | null>(
        null,
      );

    useEffect(() => {
      if (
        !className.includes(
          "profile-quiz-results__view-all",
        )
      ) {
        return;
      }

      const button =
        buttonRef.current;

      if (!button) {
        return;
      }

      const arrow =
        button.querySelector<SVGElement>(
          ".mood-link-button__arrow",
        );

      const textElement =
        button.querySelector<HTMLSpanElement>(
          ".mood-link-button__text",
        );

      let frameId = 0;
      let previous = "";

      const measure = () => {
        const buttonRect =
          button.getBoundingClientRect();

        const arrowRect =
          arrow?.getBoundingClientRect();

        const textRect =
          textElement?.getBoundingClientRect();

        const textStyles =
          textElement
            ? window.getComputedStyle(
                textElement,
              )
            : null;

        const current =
          JSON.stringify({
            label: text,

            button: {
              left: buttonRect.left,
              width: buttonRect.width,
            },

            arrow: arrowRect
              ? {
                  left: arrowRect.left,
                  width: arrowRect.width,
                  height: arrowRect.height,
                }
              : null,

            text: textRect
              ? {
                  left: textRect.left,
                  width: textRect.width,
                  height: textRect.height,

                  fontFamily:
                    textStyles?.fontFamily,

                  fontSize:
                    textStyles?.fontSize,

                  fontWeight:
                    textStyles?.fontWeight,

                  letterSpacing:
                    textStyles?.letterSpacing,

                  lineHeight:
                    textStyles?.lineHeight,

                  transform:
                    textStyles?.transform,
                }
              : null,

            fontsStatus:
              document.fonts.status,
          });

        if (current !== previous) {
          console.log(
            "QUIZ BUTTON GEOMETRY",
            JSON.parse(current),
          );

          previous = current;
        }

        frameId =
          requestAnimationFrame(
            measure,
          );
      };

      frameId =
        requestAnimationFrame(
          measure,
        );

      const timeoutId =
        window.setTimeout(() => {
          cancelAnimationFrame(
            frameId,
          );
        }, 3000);

      return () => {
        cancelAnimationFrame(
          frameId,
        );

        window.clearTimeout(
          timeoutId,
        );
      };
    }, [className, text]);

    return (
      <button
        ref={buttonRef}
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