import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useState } from "react";
import "./AchievementUnlockedModal.scss";
import type { Achievement } from "@/types/achievement";

export const AchievementUnlockedModal = ({
  achievement,
  onClose,
}: {
  achievement: Achievement;
  onClose: () => void;
}) => {
  const { width, height } = useWindowSize();
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);

    setTimeout(() => {
      onClose();
    }, 200);
  };

  return (
    <div className="achievement-modal" onClick={handleClose}>
      
      {isVisible && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={300}
          recycle={false}
        />
      )}

      <motion.div
        initial={{ scale: 0.6, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="achievement-modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="achievement-modal__glow" />

        <div className="achievement-modal__icon">
          <img src={achievement.iconUrl} alt="" />
        </div>

        <h2>Achievement unlocked</h2>
        <h3>{achievement.title}</h3>
        <p>{achievement.description}</p>

        <button onClick={handleClose}>
          Continue
        </button>
      </motion.div>
    </div>
  );
};