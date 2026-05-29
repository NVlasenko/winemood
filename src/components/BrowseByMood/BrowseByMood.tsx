import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadAll } from "@tsparticles/all";
import { Link } from "react-router-dom";
import type { Engine } from "@tsparticles/engine";

import { useMoodTheme } from "@/context/MoodThemeContext";
import { moods } from "@/data/moods";
import type { MoodCardTheme } from "@/types/mood";
import { SectionTitle } from "@/components/SectionTitle";

import arrowRight from "@/assets/images/icons/arrow-right.svg";

import {
  fireCelebrationConfetti,
  getParticleOptions,
} from "@/utils/moodEffects";

import "./BrowseByMood.scss";

type ParticleTheme = Exclude<MoodCardTheme, "celebration">;

export const BrowseByMood = () => {
  const { setMoodTheme } = useMoodTheme();

  const particleTimeoutRef = useRef<number | null>(null);

  const [isParticlesReady, setIsParticlesReady] = useState(false);
  const [activeParticleTheme, setActiveParticleTheme] =
    useState<ParticleTheme | null>(null);
  const [particleKey, setParticleKey] = useState(0);

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
      if (particleTimeoutRef.current) {
        window.clearTimeout(particleTimeoutRef.current);
      }
    };
  }, []);

  const particleOptions = useMemo(() => {
    if (!activeParticleTheme) {
      return undefined;
    }

    return getParticleOptions(activeParticleTheme);
  }, [activeParticleTheme]);

  const clearParticleTimeout = useCallback(() => {
    if (particleTimeoutRef.current) {
      window.clearTimeout(particleTimeoutRef.current);
      particleTimeoutRef.current = null;
    }
  }, []);

  const fireParticleEffect = useCallback(
    (theme: ParticleTheme) => {
      clearParticleTimeout();

      setActiveParticleTheme(null);

      requestAnimationFrame(() => {
        setParticleKey((prev) => prev + 1);
        setActiveParticleTheme(theme);
      });

      particleTimeoutRef.current = window.setTimeout(() => {
        setActiveParticleTheme(null);
        particleTimeoutRef.current = null;
      }, 2600);
    },
    [clearParticleTimeout],
  );

  const handleMoodClick = useCallback(
    (theme: MoodCardTheme) => {
      setMoodTheme(theme);

      if (theme === "celebration") {
        clearParticleTimeout();
        setActiveParticleTheme(null);
        fireCelebrationConfetti();

        return;
      }

      fireParticleEffect(theme);
    },
    [clearParticleTimeout, fireParticleEffect, setMoodTheme],
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
            <button
              key={mood.id}
              className="browse-by-mood__card"
              type="button"
              onClick={() => handleMoodClick(mood.theme)}
            >
              <div className="browse-by-mood__card-inner">
                <img
                  className="browse-by-mood__card-image"
                  src={mood.image}
                  alt={mood.title}
                />

                <div className="browse-by-mood__card-overlay" />

                <h3 className="browse-by-mood__card-title">
                  {mood.title}
                </h3>
              </div>
            </button>
          ))}
        </div>

        <div className="browse-by-mood__button-wrapper">
          <Link to="/catalog" className="button-primary browse-by-mood__button">
            Find My Wine

            <img
              src={arrowRight}
              alt=""
              className="browse-by-mood__button-arrow"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};