import { AboutHero } from "@/components/AboutHero/AboutHero";
import "./AboutPage.scss";
import { AboutFeatures } from "@/components/AboutFeatures";
import { AboutAdvantages } from "@/components/AboutAdvantages";
import { AboutHowItWorks } from "@/components/AboutHowItWorks";
import { QuizCTA } from "@/components/QuizCTA/QuizCTA";

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