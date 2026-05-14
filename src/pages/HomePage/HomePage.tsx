import React from "react";
import "./HomePage.scss";
import { HeroSection } from "../../components/HeroSection";
import { RevealOnScroll } from "../RevealOnScroll/RevealOnScroll";
import { PopularCategories } from "../../components/PopularCategories/PopularCategories";

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
