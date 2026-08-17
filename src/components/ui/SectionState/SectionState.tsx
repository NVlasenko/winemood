import "./SectionState.scss";

type SectionStateVariant =
  | "loading"
  | "error"
  | "empty";

type Props = {
  variant?: SectionStateVariant;
  text: string;
};

export const SectionState = ({
  variant = "loading",
  text,
}: Props) => {
  return (
    <div
      className={`section-state section-state--${variant}`}
      role={variant === "error" ? "alert" : "status"}
      aria-live="polite"
    >
      {variant === "loading" && (
        <div
          className="section-state__loader"
          aria-hidden="true"
        >
          <span />
          <span />
          <span />
        </div>
      )}

      <p className="section-state__text">
        {text}
      </p>
    </div>
  );
};