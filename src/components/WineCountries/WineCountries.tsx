import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { SectionTitle } from "../SectionTitle";
import { MoodLinkButton } from "../MoodLinkButton";

import type { CountryWine } from "../../types/countryWine";
import { getCountries } from "../../shared/api/countryApi";

import { cardVariants } from "../../animations/cardVariants";

import "./WineCountries.scss";

export const WineCountries = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(2);
  const [countries, setCountries] = useState<CountryWine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCountries = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getCountries();

        if (!Array.isArray(data)) {
          throw new Error("Invalid countries data");
        }

        setCountries(data);
      } catch (error) {
        console.error("Failed to load countries:", error);

        if (error instanceof TypeError) {
          setError("Network error. Please check your internet connection.");
          return;
        }

        if (error instanceof Error) {
          if (error.message.includes("404")) {
            setError("Countries endpoint not found.");
            return;
          }

          if (error.message.includes("500")) {
            setError("Server error. Please try again later.");
            return;
          }

          if (error.message.includes("Failed to fetch")) {
            setError("Unable to connect to the server.");
            return;
          }

          setError(error.message);
          return;
        }

        setError("Something went wrong.");
      } finally {
        setLoading(false);
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
  }, [isOpen, countries.length]);

  const visibleCountries = countries.slice(0, visibleCount);

  if (loading) {
    return (
      <section className="wine-countries">
        <div className="container">
          <SectionTitle title="Explore Wine Countries" />

          <p className="wine-countries__state">Loading countries...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="wine-countries">
        <div className="container">
          <SectionTitle title="Explore Wine Countries" />

          <p className="wine-countries__state wine-countries__state--error">
            {error}
          </p>
        </div>
      </section>
    );
  }

  if (!countries.length) {
    return (
      <section className="wine-countries">
        <div className="container">
          <SectionTitle title="Explore Wine Countries" />

          <p className="wine-countries__state">No countries found.</p>
        </div>
      </section>
    );
  }

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
                    backgroundImage: `url(${country.flagImageUrl})`,
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
                      src={country.bottleImageUrl}
                      alt={country.nationality}
                    />
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {countries.length > 2 && (
          <MoodLinkButton
            className="wine-countries__view-all"
            text={isOpen ? "Hide Countries" : "View All Countries"}
            onClick={() => setIsOpen((prev) => !prev)}
          />
        )}
      </div>
    </section>
  );
};