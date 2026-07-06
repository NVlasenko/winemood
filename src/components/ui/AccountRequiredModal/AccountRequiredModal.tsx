import { useEffect } from "react";
import { Link } from "react-router-dom";

import arrowRightIcon from "@/assets/images/icons/arrow-right.svg";

import "./AccountRequiredModal.scss";

type Props = {
  isOpen: boolean;
  title: string;
  text: string;
  primaryLabel?: string;
  primaryTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
  continueLabel?: string;
  cancelLabel?: string;
  onClose: () => void;
  onContinue?: () => void;
  onCancel?: () => void;
};

export const AccountRequiredModal = ({
  isOpen,
  title,
  text,
  primaryLabel = "Sign up",
  primaryTo = "/registration",
  secondaryLabel = "Log in",
  secondaryTo = "/login",
  continueLabel = "Continue without saving",
  cancelLabel,
  onClose,
  onContinue,
  onCancel,
}: Props) => {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="account-required-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="account-required-modal-title"
      aria-describedby="account-required-modal-description"
    >
      <button
        className="account-required-modal__overlay"
        type="button"
        aria-label="Close modal"
        onClick={onClose}
      />

      <div className="account-required-modal__content">
        <div className="account-required-modal__icon" aria-hidden="true">
          <span className="account-required-modal__lock-shackle" />
          <span className="account-required-modal__lock-body" />
        </div>

        <h2
          id="account-required-modal-title"
          className="account-required-modal__title"
        >
          {title}
        </h2>

        <p
          id="account-required-modal-description"
          className="account-required-modal__text"
        >
          {text}
        </p>

        <div className="account-required-modal__actions">
          <Link to={primaryTo} className="account-required-modal__primary">
            <span>{primaryLabel}</span>

            <img src={arrowRightIcon} alt="" aria-hidden="true" />
          </Link>

          <Link to={secondaryTo} className="account-required-modal__secondary">
            {secondaryLabel}
          </Link>

          {onContinue && (
            <button
              className="account-required-modal__continue"
              type="button"
              onClick={onContinue}
            >
              {continueLabel}
            </button>
          )}

          {onCancel && cancelLabel && (
            <button
              className="account-required-modal__cancel"
              type="button"
              onClick={onCancel}
            >
              {cancelLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};