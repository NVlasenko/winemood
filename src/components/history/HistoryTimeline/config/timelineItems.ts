import timeline1920s from "@/assets/images/history/timeline/img/timeline-1920s.png";
import timeline1950s from "@/assets/images/history/timeline/img/timeline-1950s.png";
import timeline1980s from "@/assets/images/history/timeline/img/timeline-1980s.png";
import timelineToday from "@/assets/images/history/timeline/img/timeline-today.png";

import { year1920sIcons } from "./year1920sIcons";
import { year1950sIcons } from "./year1950sIcons";
import { year1980sIcons } from "./year1980sIcons";
import { todayIcons } from "./todayIcons";

export const TIMELINE_ITEMS = [
  {
    id: "1920s",
    image: timeline1920s,
    icons: year1920sIcons,
    text: "The first family winery and the beginning of a tradition.",
  },
  {
    id: "1950s",
    image: timeline1950s,
    icons: year1950sIcons,
    text: "Expansion of vineyards and refinement of winemaking techniques.",
  },
  {
    id: "1980s",
    image: timeline1980s,
    icons: year1980sIcons,
    text: "New technologies introduced while preserving classic methods.",
  },
  {
    id: "today",
    image: timelineToday,
    icons: todayIcons,
    text: "Modern wine culture connects tradition, technology, and personal taste.",
  },
] as const;