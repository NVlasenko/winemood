import { AboutHero } from "@/components/about/AboutHero";
import { AboutFeatures } from "@/components/about/AboutFeatures";
import { AboutAdvantages } from "@/components/about/AboutAdvantages";
import { AboutHowItWorks } from "@/components/about/AboutHowItWorks";


import "./AboutPage.scss";
import { QuizCTA } from "@/components/quiz/QuizCTA/QuizCTA";

export const AboutPage = () => {
  return (
    <main className="about-page">
      <AboutHero />
      <AboutFeatures />
      <AboutAdvantages />
      <AboutHowItWorks />
      <QuizCTA />
    </main>
  );
};