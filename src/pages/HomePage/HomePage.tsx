import { BrowseByMood } from "@/components/home/BrowseByMood";
import { HeroSection } from "@/components/home/HeroSection";
import { WineCountries } from "@/components/home/WineCountries";
import { PopularCategories } from "@/components/home/PopularCategories/PopularCategories";
import { QuizCTA } from "@/components/quiz/QuizCTA/QuizCTA";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll/RevealOnScroll";

import "./HomePage.scss";

type HomePageProps = {
  heroBackgroundUrl: string;
};

export const HomePage = ({
  heroBackgroundUrl,
}: HomePageProps) => {
  return (
    <main className="home-page">
      <HeroSection
        heroBackgroundUrl={heroBackgroundUrl}
      />

      <RevealOnScroll>
        <BrowseByMood />
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
    </main>
  );
};