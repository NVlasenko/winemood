import React from "react";
import "./HomePage.scss";
import { HeroSection } from "../../components/HeroSection";
import { PopularCategories } from "../../components/PopularCategories/ PopularCategories";
import { RevealOnScroll } from "../RevealOnScroll/RevealOnScroll";

export const HomePage: React.FC = () => {
  return (
    <section className="home__page">
       <RevealOnScroll>
        <HeroSection />
      </RevealOnScroll>

      <RevealOnScroll>
        <PopularCategories />
      </RevealOnScroll>
    </section>
  );
};
