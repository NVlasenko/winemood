import React from "react";
import "./HomePage.scss";
import { HeroSection } from "../../components/HeroSection";
import { RevealOnScroll } from "../RevealOnScroll/RevealOnScroll";
import { PopularCategories } from "../../components/PopularCategories/PopularCategories";
import { QuizCTA } from "../../components/QuizCTA/QuizCTA";
import { WineCountries } from "../../components/WineCountries/WineCountries";

export const HomePage: React.FC = () => {
  return (
    <section className="home__page">
       <RevealOnScroll>
        <HeroSection />
      </RevealOnScroll>

      <RevealOnScroll>
        <PopularCategories />
      </RevealOnScroll>

      <RevealOnScroll>
        <QuizCTA />
      </RevealOnScroll>

      <RevealOnScroll>
        <WineCountries />
      </RevealOnScroll>
    </section>
  );
};
