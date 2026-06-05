import { HistoryHero } from "@/components/HistoryHero";
import { HistoryOrigins } from "@/components/HistoryOrigins";
import { HistoryTimeline } from "@/components/HistoryTimeline";
import { HistoryVideoSection } from "@/components/HistoryVideoSection";

export const HistoryPage = () => {
  return (
    <main>
     <HistoryHero />

     <HistoryVideoSection />

     <HistoryOrigins />

     <HistoryTimeline />
    </main>
  );
};