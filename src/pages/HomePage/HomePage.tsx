import React from "react";
import "./HomePage.scss";
import { HeroSection } from "../../components/HeroSection";
import { PopularCategories } from "../../components/PopularCategories/ PopularCategories";

export const HomePage: React.FC = () => {
  return (
    <section className="home__page">
        <HeroSection/>
        <PopularCategories/>
    </section>
  );
};
