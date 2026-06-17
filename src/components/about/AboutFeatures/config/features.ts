import { barrelIcons } from "./barrelIcons";
import { personIcons } from "./personIcons";
import { likeIcons } from "./likeIcons";
import { locationIcons } from "./locationIcons";

export const FEATURES = [
  {
    id: 1,
    title: "UNDERSTAND WINE STYLES",
    icons: barrelIcons,
  },
  {
    id: 2,
    title: "BUILD PERSONAL TASTE PROFILES",
    icons: personIcons,
  },
  {
    id: 3,
    title: "DISCOVER NEW REGIONS",
    icons: locationIcons,
  },
  {
    id: 4,
    title: "RECEIVE INTELLIGENT RECOMMENDATIONS",
    icons: likeIcons,
  },
] as const;