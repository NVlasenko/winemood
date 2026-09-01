import { HistoryHero } from "@/components/history/HistoryHero";
import { HistoryOrigins } from "@/components/history/HistoryOrigins";
import { HistoryTimeline } from "@/components/history/HistoryTimeline";
import { HistoryVideoSection } from "@/components/history/HistoryVideoSection";

import type { HistoryOrigin } from "@/types/historyOrigin";
import type { HistoryTimelineItem } from "@/types/historyTimelineItem";
import type { HistoryWomanImages } from "@/types/historyWomanImages";
import type { SiteAssets } from "@/types/siteAssets";

import "./HistoryPage.scss";

type HistoryPageProps = {
  origins?: HistoryOrigin[];
  timelineItems?: HistoryTimelineItem[];
  womanImages?: HistoryWomanImages;
  siteAssets?: SiteAssets;
};

export const HistoryPage = ({
  origins,
  timelineItems,
  womanImages,
  siteAssets,
}: HistoryPageProps) => {
  return (
    <main className="history-page">
      <HistoryHero
        womanImages={womanImages}
        siteAssets={siteAssets}
      />

      <HistoryVideoSection
        videoUrl={siteAssets?.history.videoUrl}
      />

      <HistoryOrigins
        origins={origins ?? []}
      />

      <HistoryTimeline
        timelineItems={timelineItems ?? []}
      />
    </main>
  );
};