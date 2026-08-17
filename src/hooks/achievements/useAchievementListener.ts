import { useCallback, useEffect, useMemo, useState } from "react";

import { useAchievements } from "@/hooks/achievements/useAchievements";
import { useAuth } from "@/context/AuthContext";

import type { Achievement } from "@/types/achievement";

const SHOWN_ACHIEVEMENTS_PREFIX = "shownAchievements";

export const useAchievementListener = () => {
  const { user } = useAuth();

  const { data: achievements = [], isSuccess } = useAchievements(!!user);

  const [queue, setQueue] = useState<Achievement[]>([]);

  const unlocked = useMemo(() => queue[0] ?? null, [queue]);

  useEffect(() => {
    setQueue([]);
  }, [user?.id]);

  useEffect(() => {
    if (!user || !isSuccess) {
      return;
    }

    const storageKey = `${SHOWN_ACHIEVEMENTS_PREFIX}:${user.id}`;

    const unlockedAchievements = achievements.filter((achievement) =>
      Boolean(achievement.unlockedAt)
    );

    const stored = localStorage.getItem(storageKey);

    if (stored === null) {
      const baseline = unlockedAchievements.map(
        (achievement) => achievement.code
      );

      localStorage.setItem(storageKey, JSON.stringify(baseline));

      return;
    }

    let shown: string[] = [];

    try {
      const parsed = JSON.parse(stored);

      if (Array.isArray(parsed)) {
        shown = parsed;
      } else {
        throw new Error("Invalid shown achievements");
      }
    } catch {
      const baseline = unlockedAchievements.map(
        (achievement) => achievement.code
      );

      localStorage.setItem(storageKey, JSON.stringify(baseline));

      return;
    }

    const newAchievements = unlockedAchievements.filter(
      (achievement) => !shown.includes(achievement.code)
    );

    if (!newAchievements.length) {
      return;
    }

    setQueue((currentQueue) => {
      const queuedCodes = new Set(
        currentQueue.map((achievement) => achievement.code)
      );

      const achievementsToAdd = newAchievements.filter(
        (achievement) => !queuedCodes.has(achievement.code)
      );

      return [...currentQueue, ...achievementsToAdd];
    });

    const updatedShown = [
      ...new Set([
        ...shown,

        ...newAchievements.map((achievement) => achievement.code),
      ]),
    ];

    localStorage.setItem(storageKey, JSON.stringify(updatedShown));
  }, [achievements, isSuccess, user?.id]);

  const closeAchievement = useCallback(() => {
    setQueue((currentQueue) => currentQueue.slice(1));
  }, []);

  return {
    unlocked,
    closeAchievement,
  };
};
