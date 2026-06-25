import Number01Icon from "@/assets/images/about-advantages/icons/01-default.svg?react";
import Number02Icon from "@/assets/images/about-advantages/icons/02-default.svg?react";
import Number03Icon from "@/assets/images/about-advantages/icons/03-default.svg?react";

export const ADVANTAGES = [
  {
    id: "01",
    title: "Smart Recommendations",
    text: "Personalized wine suggestions based on your taste profile and preferences.",
    Icon: Number01Icon,
  },
  {
    id: "02",
    title: "Wine Knowledge",
    text: "Learn about grape varieties, regions, tasting notes, and food pairings in a simple visual way.",
    Icon: Number02Icon,
  },
  {
    id: "03",
    title: "Curated Collections",
    text: "Explore handpicked selections organized by mood, season, flavor, and occasion.",
    Icon: Number03Icon,
  },
] as const;