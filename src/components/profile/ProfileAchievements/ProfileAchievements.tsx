import {
  useMemo,
} from "react";

import { SectionTitle } from "@/components/ui/SectionTitle";
import { SectionState } from "@/components/ui/SectionState";
import { MoodLinkButton } from "@/components/ui/MoodLinkButton";

import { useAuth } from "@/context/AuthContext";

import { useAchievements } from "@/hooks/achievements/useAchievements";
import { useExpandableSection } from "@/hooks/ui/useExpandableSection";

import { AchievementCard } from "../AchievementCard";
import { ALL_ACHIEVEMENTS } from "../config/achievementsConfig";

import type { UserDto } from "@/types/user";
import type { Achievement } from "@/types/achievement";

import "./ProfileAchievements.scss";

const INITIAL_VISIBLE_COUNT = 4;

type ProfileAchievementsProps = {
  initialUser: UserDto;
  initialAchievements: Achievement[];
};

export const ProfileAchievements = ({
  initialUser,
  initialAchievements,
}: ProfileAchievementsProps) => {
  const {
    user: authUser,
  } = useAuth();

  const {
    data: achievements =
      initialAchievements,
    isLoading,
    isError,
  } = useAchievements(
    !!(authUser || initialUser),
    initialAchievements,
  );

  const {
    isOpen,
    isVisible,
    titleRef,
    toggleOpen,
  } = useExpandableSection();

  const mergedAchievements =
    useMemo(() => {
      return ALL_ACHIEVEMENTS.map(
        (base) => {
          const achievement =
            achievements.find(
              (item) =>
                item.code === base.code,
            );

          return {
            ...base,
            ...achievement,

            unlockedAt:
              achievement?.unlockedAt ??
              null,

            progress:
              achievement?.progress,

            total:
              achievement?.total,

            iconUrl:
              achievement?.iconUrl,
          };
        },
      );
    }, [achievements]);

  const visibleAchievements =
    useMemo(
      () =>
        mergedAchievements.slice(
          0,
          INITIAL_VISIBLE_COUNT,
        ),
      [mergedAchievements],
    );

  const extraAchievements =
    useMemo(
      () =>
        mergedAchievements.slice(
          INITIAL_VISIBLE_COUNT,
        ),
      [mergedAchievements],
    );

  const hasMore =
    extraAchievements.length > 0;

  return (
    <section className="profile-achievements">
      <div
        ref={titleRef}
        className="profile-achievements__top"
      >
        <SectionTitle
          title="Achievements"
        />
      </div>

      {isLoading &&
        !achievements.length && (
          <SectionState
            variant="loading"
            text="Loading achievements..."
          />
        )}

      {isError &&
        !achievements.length && (
          <SectionState
            variant="error"
            text="Failed to load achievements."
          />
        )}

      {!!achievements.length && (
        <>
          <div className="profile-achievements__list">
            <div className="profile-achievements__grid">
              {visibleAchievements.map(
                (achievement) => (
                  <AchievementCard
                    key={
                      achievement.code
                    }
                    achievement={
                      achievement
                    }
                  />
                ),
              )}
            </div>

            {hasMore &&
              isOpen && (
                <div
                  className={`profile-achievements__extra ${
                    isVisible
                      ? "profile-achievements__extra--visible"
                      : ""
                  }`}
                >
                  <div className="profile-achievements__extra-inner">
                    <div className="profile-achievements__grid">
                      {extraAchievements.map(
                        (
                          achievement,
                        ) => (
                          <AchievementCard
                            key={
                              achievement.code
                            }
                            achievement={
                              achievement
                            }
                          />
                        ),
                      )}
                    </div>
                  </div>
                </div>
              )}
          </div>

          {hasMore && (
            <div className="profile-achievements__actions">
              <MoodLinkButton
                className="profile-achievements__view-all"
                text={
                  isOpen
                    ? "Hide Achievements"
                    : "View All Achievements"
                }
                onClick={
                  toggleOpen
                }
              />
            </div>
          )}
        </>
      )}
    </section>
  );
};