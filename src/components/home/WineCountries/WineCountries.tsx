import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { MoodLinkButton } from "@/components/ui/MoodLinkButton";
import { getCountries } from "@/shared/api/countryApi";
import type { CountryWine } from "@/types/countryWine";
import "./WineCountries.scss";
import { WineCountryCard } from "./config/ WineCountryCard";


const INITIAL_VISIBLE_COUNT = 2;

export const WineCountries = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [countries, setCountries] = useState<CountryWine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

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

  const visibleCountries = useMemo(
    () => (isOpen ? countries : countries.slice(0, INITIAL_VISIBLE_COUNT)),
    [countries, isOpen]
  );

  const handleCountryClick = useCallback(
    (countryName: string) => {
      const params = new URLSearchParams({
        countries: countryName,
      });

      navigate(`/catalog?${params.toString()}`);
    },
    [navigate]
  );

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const hasMoreCountries = countries.length > INITIAL_VISIBLE_COUNT;

  return (
    <section className="wine-countries">
      <div className="container">
        <SectionTitle title="Explore Wine Countries" />

        {loading && (
          <p className="wine-countries__state">Loading countries...</p>
        )}

        {error && !loading && (
          <p className="wine-countries__state wine-countries__state--error">
            {error}
          </p>
        )}

        {!loading && !error && !countries.length && (
          <p className="wine-countries__state">No countries found.</p>
        )}

        {!loading && !error && !!countries.length && (
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
                    <WineCountryCard
                      key={country.id}
                      country={country}
                      onCountryClick={handleCountryClick}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>

            {hasMoreCountries && (
              <div className="wine-countries__actions">
                <MoodLinkButton
                  className="wine-countries__view-all"
                  text={isOpen ? "Hide Countries" : "View All Countries"}
                  onClick={toggleOpen}
                />
            </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};
