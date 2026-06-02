import { AboutHero } from "@/components/AboutHero/AboutHero";
import "./AboutPage.scss";
import { AboutFeatures } from "@/components/AboutFeatures";

export const AboutPage = () => {
  return (
    <main className="about-page">
      <AboutHero />
      <AboutFeatures />
    </main>
  );
};