import { HistoryHero } from "@/components/HistoryHero";
import { HistoryOrigins } from "@/components/HistoryOrigins";
import { HistoryVideoSection } from "@/components/HistoryVideoSection";

export const HistoryPage = () => {
  return (
    <main>
     <HistoryHero />

     <HistoryVideoSection />

     <HistoryOrigins />
    </main>
  );
};