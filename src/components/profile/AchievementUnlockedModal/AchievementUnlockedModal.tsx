import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import Confetti from "react-confetti";

import type { Achievement } from "@/types/achievement";

import "./AchievementUnlockedModal.scss";

type AchievementUnlockedModalProps = {
  achievement: Achievement;
  onClose: () => void;
};

type WindowSize = {
  width: number;
  height: number;
};

export const AchievementUnlockedModal = ({
  achievement,
  onClose,
}: AchievementUnlockedModalProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const [windowSize, setWindowSize] =
    useState<WindowSize>({
      width: 0,
      height: 0,
    });

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateWindowSize();

    window.addEventListener(
      "resize",
      updateWindowSize,
    );

    return () => {
      window.removeEventListener(
        "resize",
        updateWindowSize,
      );
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);

    window.setTimeout(() => {
      onClose();
    }, 200);
  };

  return (
    <div
      className="achievement-modal"
      onClick={handleClose}
    >
      {isVisible &&
        windowSize.width > 0 &&
        windowSize.height > 0 && (
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            numberOfPieces={300}
            recycle={false}
          />
        )}

      <motion.div
        initial={{
          scale: 0.6,
          opacity: 0,
          y: 40,
        }}
        animate={{
          scale: 1,
          opacity: 1,
          y: 0,
        }}
        exit={{
          scale: 0.8,
          opacity: 0,
        }}
        transition={{
          duration: 0.3,
        }}
        className="achievement-modal__content"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className="achievement-modal__glow" />

        <div className="achievement-modal__icon">
          <img
            src={achievement.iconUrl}
            alt=""
          />
        </div>

        <h2>Achievement unlocked</h2>

        <h3>{achievement.title}</h3>

        <p>{achievement.description}</p>

        <button
          type="button"
          onClick={handleClose}
        >
          Continue
        </button>
      </motion.div>
    </div>
  );
};