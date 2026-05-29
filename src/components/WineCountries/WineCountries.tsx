import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { SectionTitle } from "../SectionTitle";
import { MoodLinkButton } from "../MoodLinkButton";

import type { CountryWine } from "../../types/countryWine";
import { getCountries } from "../../shared/api/countryApi";

import { cardVariants } from "../../animations/cardVariants";

import "./WineCountries.scss";

const INITIAL_VISIBLE_COUNT = 2;

export const WineCountries = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [countries, setCountries] = useState<CountryWine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadCountries = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getCountries();

        if (!Array.isArray(data)) {
          throw new Error("Invalid countries data");
        }

        if (isMounted) {
          setCountries(data);
        }
      } catch (error) {
        if (!isMounted) {
          return;
        }

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
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadCountries();

    return () => {
      isMounted = false;
    };
  }, []);

  const visibleCountries = useMemo(() => {
    return isOpen
      ? countries
      : countries.slice(0, INITIAL_VISIBLE_COUNT);
  }, [countries, isOpen]);

  const renderContent = () => {
    if (loading) {
      return (
        <p className="wine-countries__state">
          Loading countries...
        </p>
      );
    }

    if (error) {
      return (
        <p className="wine-countries__state wine-countries__state--error">
          {error}
        </p>
      );
    }

    if (!countries.length) {
      return (
        <p className="wine-countries__state">
          No countries found.
        </p>
      );
    }

    return (
      <>
        <motion.div
          className="wine-countries__grid-wrap"
          layout
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="wine-countries__grid">
            <AnimatePresence mode="popLayout">
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
                  layout
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

        {countries.length > INITIAL_VISIBLE_COUNT && (
          <MoodLinkButton
            className="wine-countries__view-all"
            text={
              isOpen
                ? "Hide Countries"
                : "View All Countries"
            }
            onClick={() => setIsOpen((prev) => !prev)}
          />
        )}
      </>
    );
  };

  return (
    <section className="wine-countries">
      <div className="container">
        <SectionTitle title="Explore Wine Countries" />

        {renderContent()}
      </div>
    </section>
  );
};