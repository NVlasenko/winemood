import { number01Icons } from "./number01Icons";
import { number02Icons } from "./number02Icons";
import { number03Icons } from "./number03Icons";

export const ADVANTAGES = [
  {
    id: "01",
    title: "Smart Recommendations",
    text: "Personalized wine suggestions based on your taste profile and preferences.",
    icons: number01Icons,
  },
  {
    id: "02",
    title: "Wine Knowledge",
    text: "Learn about grape varieties, regions, tasting notes, and food pairings in a simple visual way.",
    icons: number02Icons,
  },
  {
    id: "03",
    title: "Curated Collections",
    text: "Explore handpicked selections organized by mood, season, flavor, and occasion.",
    icons: number03Icons,
  },
] as const;