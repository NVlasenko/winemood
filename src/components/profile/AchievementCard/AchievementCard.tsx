import "./AchievementCard.scss";
import type { Achievement } from "@/types/achievement";

export const AchievementCard = ({
  achievement,
}: {
  achievement: Achievement;
}) => {
  const isUnlocked = Boolean(achievement.unlockedAt);

  return (
    <div className={`achievement ${!isUnlocked ? "achievement--locked" : ""}`}>
      <div className="achievement__aura" />

      <div className="achievement__icon">
        {achievement.iconUrl ? (
          <img src={achievement.iconUrl} alt="" 
          loading="lazy"
          decoding="async" 
          />
        ) : (
          <div className="achievement__placeholder" />
        )}
      </div>

      <div className="achievement__content">
        <h3>{achievement.title}</h3>
        <p>{achievement.description}</p>
      </div>
    </div>
  );
};
