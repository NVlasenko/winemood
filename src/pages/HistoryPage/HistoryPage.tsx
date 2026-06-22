import { HistoryHero } from "@/components/history/HistoryHero";
import { HistoryOrigins } from "@/components/history/HistoryOrigins";
import { HistoryTimeline } from "@/components/history/HistoryTimeline";
import { HistoryVideoSection } from "@/components/history/HistoryVideoSection";

import "./HistoryPage.scss";

export const HistoryPage = () => {
  return (
    <main className="history-page">
      <HistoryHero />
      <HistoryVideoSection />
      <HistoryOrigins />
      <HistoryTimeline />
    </main>
  );
};