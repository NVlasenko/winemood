import { useEffect, useMemo, useRef, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadAll } from '@tsparticles/all';
import type { Engine } from '@tsparticles/engine';
import { useMoodTheme } from '../../context/MoodThemeContext';
import { moods } from '../../data/moods';
import type { MoodCardTheme } from '../../types/mood';
import { SectionTitle } from '../SectionTitle';
import arrowRight from '../../assets/images/icons/arrow-right.svg';
import './BrowseByMood.scss';
import { fireCelebrationConfetti, getParticleOptions } from '../../utils/moodEffects';

type ParticleTheme = Exclude<MoodCardTheme, 'celebration'>;

export const BrowseByMood = () => {
  const { setMoodTheme } = useMoodTheme();
  const particleTimeoutRef = useRef<number | null>(null);
  const [isParticlesReady, setIsParticlesReady] = useState(false);
  const [activeParticleTheme, setActiveParticleTheme] =
    useState<ParticleTheme | null>(null);
  const [particleKey, setParticleKey] = useState(0);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadAll(engine);
    }).then(() => {
      setIsParticlesReady(true);
    });
  }, []);

  const particleOptions = useMemo(() => {
    if (!activeParticleTheme) {
      return undefined;
    }

    return getParticleOptions(activeParticleTheme);
  }, [activeParticleTheme]);

  const fireParticleEffect = (theme: ParticleTheme) => {
    if (particleTimeoutRef.current) {
      window.clearTimeout(particleTimeoutRef.current);
    }
  
    setActiveParticleTheme(null);
  
    requestAnimationFrame(() => {
      setParticleKey(prev => prev + 1);
      setActiveParticleTheme(theme);
    });
  
    particleTimeoutRef.current = window.setTimeout(() => {
      setActiveParticleTheme(null);
      particleTimeoutRef.current = null;
    }, 2600);
  };
  useEffect(() => {
    return () => {
      if (particleTimeoutRef.current) {
        window.clearTimeout(particleTimeoutRef.current);
      }
    };
  }, []);
  const handleMoodClick = (theme: MoodCardTheme) => {
    setMoodTheme(theme);

    if (theme === 'celebration') {
      fireCelebrationConfetti();
      return;
    }

    fireParticleEffect(theme);
  };

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
          {moods.map(mood => (
            <article
              key={mood.id}
              className="browse-by-mood__card"
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
            </article>
          ))}
        </div>

        <div className="browse-by-mood__button-wrapper">
          <button
            className="button-primary browse-by-mood__button"
            type="button"
          >
            Find My Wine

            <img
              src={arrowRight}
              alt="Arrow right"
              className="browse-by-mood__button-arrow"
            />
          </button>
        </div>
      </div>
    </section>
  );
};