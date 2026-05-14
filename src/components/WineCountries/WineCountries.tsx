import { useEffect, useState } from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { SectionTitle } from '../SectionTitle';
import type { CountryWine } from '../../types/countryWine';
import arrowRight from '../../assets/images/icons/arrow-red.svg';
import wineImage from '../../assets/images/wine.png';
import countryBg from '../../assets/images/countryBg.png';
import './WineCountries.scss';

const countries: CountryWine[] = [
  { id: 1, title: 'Italian Red', backgroundImage: countryBg, wineImage },
  { id: 2, title: 'Californian White', backgroundImage: countryBg, wineImage },
  { id: 3, title: 'French Rosé', backgroundImage: countryBg, wineImage },
  { id: 4, title: 'Spanish Red', backgroundImage: countryBg, wineImage },
  { id: 5, title: 'Georgian Amber', backgroundImage: countryBg, wineImage },
  { id: 6, title: 'Portuguese Port', backgroundImage: countryBg, wineImage },
  { id: 7, title: 'Chilean Merlot', backgroundImage: countryBg, wineImage },
  { id: 8, title: 'German Riesling', backgroundImage: countryBg, wineImage },
];

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
    scale: 0.96,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },

  exit: {
    opacity: 0,
    y: 25,
    scale: 0.96,

    transition: {
      duration: 0.45,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export const WineCountries = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(2);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleCount(prev => {
        if (isOpen && prev < countries.length) {
          return prev + 1;
        }

        if (!isOpen && prev > 2) {
          return prev - 1;
        }

        clearInterval(timer);
        return prev;
      });
    }, 480);

    return () => clearInterval(timer);
  }, [isOpen]);

  const visibleCountries = countries.slice(0, visibleCount);

  return (
    <section className="wine-countries">
      <div className="container">
        <SectionTitle title="Explore Wine Countries" />

        <motion.div
          className="wine-countries__grid-wrap"
          layout={!isOpen}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="wine-countries__grid">
            <AnimatePresence>
              {visibleCountries.map(country => (
                <motion.article
                  key={country.id}
                  className="wine-countries__card"
                  style={{
                    backgroundImage: `url(${country.backgroundImage})`,
                  }}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="wine-countries__content">
                    <h3 className="wine-countries__card-title">
                      {country.title}
                    </h3>
                  </div>

                  <div className="wine-countries__image-wrap">
                    <img
                      className="wine-countries__card-image"
                      src={country.wineImage}
                      alt={country.title}
                    />
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        <button
          className="wine-countries__view-all"
          type="button"
          onClick={() => setIsOpen(prev => !prev)}
        >
          <img
            className="wine-countries__view-all-arrow"
            src={arrowRight}
            alt=""
          />

          {isOpen ? 'Hide Countries' : 'View All Countries'}
        </button>
      </div>
    </section>
  );
};