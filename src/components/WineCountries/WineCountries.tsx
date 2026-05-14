import { useState } from 'react';

import { SectionTitle } from '../SectionTitle';

import type { CountryWine } from '../../types/countryWine';
import arrowRight from '../../assets/images/icons/arrow-red.svg';
import wineImage from '../../assets/images/wine.svg';
import countryBg from '../../assets/images/countryBg.png';
import { AnimatePresence, motion } from 'framer-motion';

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

export const WineCountries = () => {
  const [isOpen, setIsOpen] = useState(false);

  const visibleCountries = isOpen ? countries : countries.slice(0, 2);

  return (
    <section className="wine-countries">
      <div className="container">
        <SectionTitle title="Explore Wine Countries" />

        <div className="wine-countries__grid">
  <AnimatePresence>
    {visibleCountries.map((country) => (
    <motion.article
    key={country.id}
    className="wine-countries__card"
    style={{
      backgroundImage: `url(${country.backgroundImage})`,
    }}
    initial={{ opacity: 0, y: 30, scale: 0.96 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 20, scale: 0.96 }}
    transition={{ duration: 0.35, ease: 'easeOut' }}
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