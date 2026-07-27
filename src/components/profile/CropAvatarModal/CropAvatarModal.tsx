import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "./CropAvatarModal.scss";

type Props = {
  image: string;
  onClose: () => void;
  onSave: (blob: Blob) => void;
};

export const CropAvatarModal = ({ image, onClose, onSave }: Props) => {
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });

  const CIRCLE_SIZE = 180;

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const handleLoad = () => {
      const parent = img.parentElement!;
      const pw = parent.clientWidth;
      const ph = parent.clientHeight;

      setOffset({
        x: (pw - img.width) / 2,
        y: (ph - img.height) / 2,
      });
    };

    if (img.complete) handleLoad();
    else img.onload = handleLoad;
  }, [image]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setStart({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;

    setOffset({
      x: e.clientX - start.x,
      y: e.clientY - start.y,
    });
  };

  const handleMouseUp = () => setDragging(false);

  const handleSave = () => {
    const img = imgRef.current;
    if (!img) return;

    const canvas = document.createElement("canvas");
    canvas.width = CIRCLE_SIZE;
    canvas.height = CIRCLE_SIZE;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = img.parentElement!;
    const pw = parent.clientWidth;
    const ph = parent.clientHeight;

    const scale = img.naturalWidth / img.width;

    const circleX = pw / 2 - CIRCLE_SIZE / 2;
    const circleY = ph / 2 - CIRCLE_SIZE / 2;

    const cropX = (circleX - offset.x) * scale;
    const cropY = (circleY - offset.y) * scale;

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
      CIRCLE_SIZE * scale,
      CIRCLE_SIZE * scale,
      0,
      0,
      CIRCLE_SIZE,
      CIRCLE_SIZE
    );

    canvas.toBlob((blob) => {
      if (blob) onSave(blob);
    }, "image/jpeg");
  };

  return createPortal(
    <div
      className="avatar-modal"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="avatar-modal__backdrop" onClick={onClose} />

      <div className="avatar-modal__card">
        <div className="avatar-modal__title">Adjust avatar</div>

        <div className="avatar-modal__viewport">
          <img
            ref={imgRef}
            src={image}
            alt=""
            className="avatar-modal__image"
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px)`,
              cursor: dragging ? "grabbing" : "grab",
            }}
            onMouseDown={handleMouseDown}
            draggable={false}
          />

          <div className="avatar-modal__circle" />
        </div>

        <div className="avatar-modal__actions">
          <button
            className="avatar-modal__btn cancel"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="avatar-modal__btn save"
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