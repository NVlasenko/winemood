import {
  memo,
  useCallback,
  useMemo,
} from "react";

import type { CountryWineDto } from "@/types/countryWine";

type Props = {
  country: CountryWineDto;
  onCountryClick: (
    countryName: string,
  ) => void;
};

export const WineCountryCard = memo(
  ({
    country,
    onCountryClick,
  }: Props) => {
    const backgroundStyle =
      useMemo(
        () => ({
          backgroundImage: `url(${country.flagImageUrl})`,
        }),
        [country.flagImageUrl],
      );

    const handleClick =
      useCallback(() => {
        onCountryClick(country.name);
      }, [
        onCountryClick,
        country.name,
      ]);

    return (
      <button
        className="wine-countries__card"
        type="button"
        style={backgroundStyle}
        onClick={handleClick}
      >
        <div className="wine-countries__content">
          <h3 className="wine-countries__card-title">
            {country.nationality}
          </h3>
        </div>

        <div className="wine-countries__image-wrap">
          <img
            className="wine-countries__card-image"
            src={
              country.bottleImageUrl
            }
            alt={
              country.nationality
            }
          />
        </div>
      </button>
    );
  },
);

WineCountryCard.displayName =
  "WineCountryCard";