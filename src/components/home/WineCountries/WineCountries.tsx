import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { MoodLinkButton } from "@/components/ui/MoodLinkButton";
import { SectionState } from "@/components/ui/SectionState";

import { getCountries } from "@/shared/api/countryApi";

import { useExpandableSection } from "@/hooks/ui/useExpandableSection";

import type { CountryWineDto } from "@/types/countryWine";

import { WineCountryCard } from "./config/ WineCountryCard";

import "./WineCountries.scss";

const INITIAL_VISIBLE_COUNT = 2;

export const WineCountries = () => {
  const [countries, setCountries] = useState<CountryWineDto[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { isOpen, titleRef, toggleOpen } = useExpandableSection();

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
      
        setError("Something went wrong. Please try again later.");
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

  const initialCountries = useMemo(
    () => countries.slice(0, INITIAL_VISIBLE_COUNT),
    [countries]
  );

  const extraCountries = useMemo(
    () => countries.slice(INITIAL_VISIBLE_COUNT),
    [countries]
  );

  const hasMoreCountries = extraCountries.length > 0;

  const handleCountryClick = useCallback(
    (countryName: string) => {
      const params = new URLSearchParams({
        countries: countryName,
      });

      navigate(`/catalog?${params.toString()}`);
    },
    [navigate]
  );

  return (
    <section className="wine-countries">
      <div className="container">
        <div ref={titleRef} className="wine-countries__title">
          <SectionTitle title="Explore Wine Countries" />
        </div>

        {loading && (
          <SectionState variant="loading" text="Loading countries..." />
        )}

        {error && !loading && <SectionState variant="error" text={error} />}

        {!loading && !error && !countries.length && (
          <SectionState variant="empty" text="No countries found." />
        )}

        {!loading && !error && !!countries.length && (
          <>
            <div className="wine-countries__list">
              <div className="wine-countries__grid">
                {initialCountries.map((country) => (
                  <WineCountryCard
                    key={country.id}
                    country={country}
                    onCountryClick={handleCountryClick}
                  />
                ))}
              </div>

              {hasMoreCountries && (
                <div
                  className={`wine-countries__extra ${
                    isOpen ? "wine-countries__extra--open" : ""
                  }`}
                >
                  <div className="wine-countries__extra-inner">
                    <div className="wine-countries__grid">
                      {extraCountries.map((country) => (
                        <WineCountryCard
                          key={country.id}
                          country={country}
                          onCountryClick={handleCountryClick}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

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
