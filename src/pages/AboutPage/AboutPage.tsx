import { AboutHero } from "@/components/AboutHero/AboutHero";
import "./AboutPage.scss";
import { AboutFeatures } from "@/components/AboutFeatures";
import { AboutAdvantages } from "@/components/AboutAdvantages";

export const AboutPage = () => {
  return (
    <main className="about-page">
      <AboutHero />
      <AboutFeatures />
      <AboutAdvantages />
    </main>
  );
};