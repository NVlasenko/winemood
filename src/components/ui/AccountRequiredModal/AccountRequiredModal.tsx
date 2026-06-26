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
  if (!isOpen) {
    return null;
  }

  return (
    <div className="account-required-modal" role="dialog" aria-modal="true">
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

        <h2 className="account-required-modal__title">{title}</h2>

        <p className="account-required-modal__text">{text}</p>

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