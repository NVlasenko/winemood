import { BrowseByMood } from "@/components/home/BrowseByMood";
import { HeroSection } from "@/components/home/HeroSection";
import { WineCountries } from "@/components/home/WineCountries";
import { PopularCategories } from "@/components/home/PopularCategories/PopularCategories";
import { QuizCTA } from "@/components/quiz/QuizCTA/QuizCTA";

import type { MoodAsset } from "@/types/mood";
import type { Category } from "@/types/categories";
import type { CountryWineDto } from "@/types/countryWine";

import "./HomePage.scss";

type HomePageProps = {
  heroBackgroundUrl: string;
  moods: MoodAsset[];
  categories: Category[];
  countries: CountryWineDto[];
};

export const HomePage = ({
  heroBackgroundUrl,
  moods,
  categories,
  countries,
}: HomePageProps) => {
  return (
    <main className="home-page">
      <HeroSection
        heroBackgroundUrl={heroBackgroundUrl}
      />

      <BrowseByMood moods={moods} />

      <PopularCategories
        categories={categories}
      />

      <QuizCTA />

      <WineCountries
        countries={countries}
      />
    </main>
  );
};