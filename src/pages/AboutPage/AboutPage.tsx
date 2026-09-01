import { AboutHero } from "@/components/about/AboutHero";
import { AboutFeatures } from "@/components/about/AboutFeatures";
import { AboutAdvantages } from "@/components/about/AboutAdvantages";
import { AboutHowItWorks } from "@/components/about/AboutHowItWorks";
import { QuizCTA } from "@/components/quiz/QuizCTA/QuizCTA";

import type { SiteAssets } from "@/types/siteAssets";

import "./AboutPage.scss";

type AboutPageProps = {
  siteAssets: SiteAssets;
};

export const AboutPage = ({
  siteAssets,
}: AboutPageProps) => {
  return (
    <main className="about-page">
      <AboutHero siteAssets={siteAssets} />

      <AboutFeatures />

      <AboutAdvantages />

      <AboutHowItWorks />

      <QuizCTA />
    </main>
  );
};