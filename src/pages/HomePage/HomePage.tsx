import { BrowseByMood } from "@/components/home/BrowseByMood";
import { HeroSection } from "@/components/home/HeroSection";

import { WineCountries } from "@/components/home/WineCountries";


import "./HomePage.scss";
import { RevealOnScroll } from "../../components/ui/RevealOnScroll/RevealOnScroll";
import { PopularCategories } from "@/components/home/PopularCategories/PopularCategories";
import { QuizCTA } from "@/components/quiz/QuizCTA/QuizCTA";

export const HomePage = () => {
  return (
    <main className="home-page">
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

      <RevealOnScroll>
        <BrowseByMood />
      </RevealOnScroll>
    </main>
  );
};