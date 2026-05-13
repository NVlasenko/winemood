import React from "react";
import "./HomePage.scss";
import { HeroSection } from "../../components/HeroSection";

export const HomePage: React.FC = () => {
  return (
    <section className="home__page">
      <div className="container">
        <HeroSection/>
      </div>
    </section>
  );
};
