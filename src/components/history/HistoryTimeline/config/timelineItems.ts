import timeline1920s from "@/assets/images/history/timeline/img/timeline-1920s.png";
import timeline1950s from "@/assets/images/history/timeline/img/timeline-1950s.png";
import timeline1980s from "@/assets/images/history/timeline/img/timeline-1980s.png";
import timelineToday from "@/assets/images/history/timeline/img/timeline-today.png";

import Year1920sIcon from "@/assets/images/history/timeline/icons/1920s-default.svg?react";
import Year1950sIcon from "@/assets/images/history/timeline/icons/1950s-default.svg?react";
import Year1980sIcon from "@/assets/images/history/timeline/icons/1980s-default.svg?react";
import TodayIcon from "@/assets/images/history/timeline/icons/today-default.svg?react";

export const TIMELINE_ITEMS = [
  {
    id: "1920s",
    image: timeline1920s,
    Icon: Year1920sIcon,
    text: "The first family winery and the beginning of a tradition.",
  },
  {
    id: "1950s",
    image: timeline1950s,
    Icon: Year1950sIcon,
    text: "Expansion of vineyards and refinement of winemaking techniques.",
  },
  {
    id: "1980s",
    image: timeline1980s,
    Icon: Year1980sIcon,
    text: "New technologies introduced while preserving classic methods.",
  },
  {
    id: "today",
    image: timelineToday,
    Icon: TodayIcon,
    text: "Modern wine culture connects tradition, technology, and personal taste.",
  },
] as const;