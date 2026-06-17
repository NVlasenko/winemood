import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadAll } from "@tsparticles/all";
import { Link } from "react-router-dom";
import type { Engine } from "@tsparticles/engine";

import { SectionTitle } from "@/components/ui/SectionTitle";
import { useMoodTheme } from "@/context/MoodThemeContext";
import { moods } from "@/data/moods";
import type { MoodCardTheme } from "@/types/mood";

import arrowRight from "@/assets/images/icons/arrow-right.svg";

import {
  fireCelebrationConfetti,
  getParticleOptions,
} from "@/utils/moodEffects";

import "./BrowseByMood.scss";
import { MoodCard } from "./sections/MoodCard";


type ParticleTheme = Exclude<MoodCardTheme, "celebration">;

export const BrowseByMood = () => {
  const { moodTheme, setMoodTheme } = useMoodTheme();

  const particleTimeoutRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const [isParticlesReady, setIsParticlesReady] = useState(false);
  const [activeParticleTheme, setActiveParticleTheme] =
    useState<ParticleTheme | null>(null);
  const [particleKey, setParticleKey] = useState(0);

  const clearParticleTimeout = useCallback(() => {
    if (particleTimeoutRef.current) {
      window.clearTimeout(particleTimeoutRef.current);
      particleTimeoutRef.current = null;
    }
  }, []);

  const clearAnimationFrame = useCallback(() => {
    if (animationFrameRef.current) {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    initParticlesEngine(async (engine: Engine) => {
      await loadAll(engine);
    }).then(() => {
      if (isMounted) {
        setIsParticlesReady(true);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    return () => {
      clearParticleTimeout();
      clearAnimationFrame();
    };
  }, [clearParticleTimeout, clearAnimationFrame]);

  const particleOptions = useMemo(() => {
    if (!activeParticleTheme) {
      return undefined;
    }

    return getParticleOptions(activeParticleTheme);
  }, [activeParticleTheme]);

  const fireParticleEffect = useCallback(
    (theme: ParticleTheme) => {
      clearParticleTimeout();
      clearAnimationFrame();

      setActiveParticleTheme(null);

      animationFrameRef.current = window.requestAnimationFrame(() => {
        setParticleKey((prev) => prev + 1);
        setActiveParticleTheme(theme);
        animationFrameRef.current = null;
      });

      particleTimeoutRef.current = window.setTimeout(() => {
        setActiveParticleTheme(null);
        particleTimeoutRef.current = null;
      }, 2600);
    },
    [clearParticleTimeout, clearAnimationFrame],
  );

  const handleResetMood = useCallback(() => {
    clearParticleTimeout();
    clearAnimationFrame();
    setActiveParticleTheme(null);
    setMoodTheme("default");
  }, [clearParticleTimeout, clearAnimationFrame, setMoodTheme]);

  const handleMoodClick = useCallback(
    (theme: MoodCardTheme) => {
      setMoodTheme(theme);

      if (theme === "celebration") {
        clearParticleTimeout();
        clearAnimationFrame();
        setActiveParticleTheme(null);
        fireCelebrationConfetti();

        return;
      }

      fireParticleEffect(theme);
    },
    [
      setMoodTheme,
      clearParticleTimeout,
      clearAnimationFrame,
      fireParticleEffect,
    ],
  );

  return (
    <section className="browse-by-mood">
      {isParticlesReady && activeParticleTheme && particleOptions && (
        <Particles
          key={particleKey}
          id={`mood-particles-${particleKey}`}
          className="browse-by-mood__particles-layer"
          options={particleOptions}
        />
      )}

      <div className="container">
        <SectionTitle title="Browse By Mood" />

        <div className="browse-by-mood__grid">
          {moods.map((mood) => (
            <MoodCard
              key={mood.id}
              mood={mood}
              onMoodClick={handleMoodClick}
            />
          ))}
        </div>

        <div className="browse-by-mood__actions">
          <div className="browse-by-mood__mood-control">
            {moodTheme !== "default" && (
              <button
                type="button"
                className="browse-by-mood__reset-theme"
                onClick={handleResetMood}
                aria-label="Reset mood to default"
              >
                <span className="browse-by-mood__reset-label">
                  Current Mood
                </span>

                <span className="browse-by-mood__reset-value">
                  {moodTheme}
                </span>

                <span className="browse-by-mood__reset-divider" />

                <span className="browse-by-mood__reset-action">
                  Reset
                </span>
              </button>
            )}
          </div>

          <div className="browse-by-mood__button-wrapper">
            <Link
              to="/catalog"
              className="button-primary browse-by-mood__button"
            >
              Find My Wine

              <img
                src={arrowRight}
                alt=""
                className="browse-by-mood__button-arrow"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};