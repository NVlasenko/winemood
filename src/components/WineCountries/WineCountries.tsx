import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionTitle } from "../SectionTitle";
import type { CountryWine } from "../../types/countryWine";
import "./WineCountries.scss";
import { cardVariants } from "../../animations/cardVariants";
import { MoodLinkButton } from "../MoodLinkButton";
import { getCountries } from "../../shared/api/countryApi";

export const WineCountries = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(2);
  const [countries, setCountries] = useState<CountryWine[]>([]);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const data = await getCountries();
  
        setCountries(data);
      } catch (error) {
        console.error("Failed to load countries", error);
      }
    };
  
    loadCountries();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleCount((prev) => {
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
              {visibleCountries.map((country) => (
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
                      {country.nationality}
                    </h3>
                  </div>

                  <div className="wine-countries__image-wrap">
                    <img
                      className="wine-countries__card-image"
                      src={country.wineImage}
                      alt={country.nationality}
                    />
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        <MoodLinkButton
          className="wine-countries__view-all"
          text={isOpen ? "Hide Countries" : "View All Countries"}
          onClick={() => setIsOpen((prev) => !prev)}
        />
      </div>
    </section>
  );
};
