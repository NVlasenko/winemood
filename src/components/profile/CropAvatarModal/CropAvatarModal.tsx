import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import "./CropAvatarModal.scss";

type Props = {
  image: string;
  onClose: () => void;
  onSave: (blob: Blob) => void;
};

export const CropAvatarModal = ({ image, onClose, onSave }: Props) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  const [offset, setOffset] = useState({
    x: 0,
    y: 0,
  });

  const [dragging, setDragging] = useState(false);

  const dragStartRef = useRef({
    pointerX: 0,
    pointerY: 0,
    offsetX: 0,
    offsetY: 0,
  });

  const CIRCLE_SIZE = 180;

  useEffect(() => {
    const img = imgRef.current;
    const viewport = viewportRef.current;

    if (!img || !viewport) {
      return;
    }

    const handleLoad = () => {
      const viewportWidth = viewport.clientWidth;
      const viewportHeight = viewport.clientHeight;

      setOffset({
        x: (viewportWidth - img.clientWidth) / 2,
        y: (viewportHeight - img.clientHeight) / 2,
      });
    };

    if (img.complete) {
      handleLoad();
    } else {
      img.addEventListener("load", handleLoad);

      return () => {
        img.removeEventListener("load", handleLoad);
      };
    }
  }, [image]);

  const handlePointerDown = (event: React.PointerEvent<HTMLImageElement>) => {
    event.preventDefault();

    event.currentTarget.setPointerCapture(event.pointerId);

    setDragging(true);

    dragStartRef.current = {
      pointerX: event.clientX,
      pointerY: event.clientY,
      offsetX: offset.x,
      offsetY: offset.y,
    };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLImageElement>) => {
    if (!dragging) {
      return;
    }

    event.preventDefault();

    const deltaX = event.clientX - dragStartRef.current.pointerX;
    const deltaY = event.clientY - dragStartRef.current.pointerY;

    setOffset({
      x: dragStartRef.current.offsetX + deltaX,
      y: dragStartRef.current.offsetY + deltaY,
    });
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLImageElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    setDragging(false);
  };

  const handlePointerCancel = (
    event: React.PointerEvent<HTMLImageElement>
  ) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    setDragging(false);
  };

  const handleSave = () => {
    const img = imgRef.current;
    const viewport = viewportRef.current;

    if (!img || !viewport) {
      return;
    }

    const canvas = document.createElement("canvas");

    canvas.width = CIRCLE_SIZE;
    canvas.height = CIRCLE_SIZE;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    const viewportWidth = viewport.clientWidth;
    const viewportHeight = viewport.clientHeight;

    const renderedWidth = img.clientWidth;
    const renderedHeight = img.clientHeight;

    if (!renderedWidth || !renderedHeight) {
      return;
    }

    const scaleX = img.naturalWidth / renderedWidth;
    const scaleY = img.naturalHeight / renderedHeight;

    const circleX = viewportWidth / 2 - CIRCLE_SIZE / 2;
    const circleY = viewportHeight / 2 - CIRCLE_SIZE / 2;

    const cropX = (circleX - offset.x) * scaleX;
    const cropY = (circleY - offset.y) * scaleY;

    const cropWidth = CIRCLE_SIZE * scaleX;
    const cropHeight = CIRCLE_SIZE * scaleY;

    ctx.beginPath();

    ctx.arc(
      CIRCLE_SIZE / 2,
      CIRCLE_SIZE / 2,
      CIRCLE_SIZE / 2,
      0,
      Math.PI * 2
    );

    ctx.clip();

    ctx.drawImage(
      img,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      CIRCLE_SIZE,
      CIRCLE_SIZE
    );

    canvas.toBlob(
      (blob) => {
        if (blob) {
          onSave(blob);
        }
      },
      "image/jpeg",
      0.92
    );
  };

  return createPortal(
    <div className="avatar-modal">
      <button
        className="avatar-modal__backdrop"
        type="button"
        aria-label="Close avatar editor"
        onClick={onClose}
      />

      <div
        className="avatar-modal__card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="avatar-modal-title"
      >
        <div
          className="avatar-modal__title"
          id="avatar-modal-title"
        >
          Adjust avatar
        </div>

        <div
          ref={viewportRef}
          className="avatar-modal__viewport"
        >
          <img
            ref={imgRef}
            src={image}
            alt=""
            className={`avatar-modal__image ${
              dragging ? "avatar-modal__image--dragging" : ""
            }`}
            style={{
              transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            draggable={false}
          />

          <div className="avatar-modal__circle" />
        </div>

        <div className="avatar-modal__actions">
          <button
            className="avatar-modal__btn cancel"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="avatar-modal__btn save"
            type="button"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};