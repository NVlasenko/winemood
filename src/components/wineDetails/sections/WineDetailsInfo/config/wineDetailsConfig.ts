import type { Wine } from "@/types/wine";
import { formatLabel } from "@/utils/formatLabel";

import { agingIcons } from "./agingIcons";
import { appellationIcons } from "./appellationIcons";
import { ecoIcons } from "./ecoIcons";
import { fermentationIcons } from "./fermentationIcons";
import { grapeIcons } from "./grapeIcons";
import { producerIcons } from "./producerIcons";

export const getWineDetails = (wine: Wine, moodTheme: string) => [
  {
    id: "grape-variety",
    title: "Grape variety",
    value: wine.grapeVariety
      ? `100% ${formatLabel(wine.grapeVariety)}`
      : "Unknown",
    icon: grapeIcons[moodTheme] || grapeIcons.default,
  },
  {
    id: "producer",
    title: "Producer",
    value: wine.producerName || "Unknown",
    icon: producerIcons[moodTheme] || producerIcons.default,
  },
  {
    id: "aging",
    title: "Aging",
    value: wine.agingMonths
      ? `${wine.agingMonths} months total`
      : "Not specified",
    icon: agingIcons[moodTheme] || agingIcons.default,
  },
  {
    id: "ecological-attributes",
    title: "Ecological attributes",
    value: wine.environmentalAttributes?.length
      ? wine.environmentalAttributes.map(formatLabel).join(" / ")
      : "Not specified",
    icon: ecoIcons[moodTheme] || ecoIcons.default,
  },
  {
    id: "fermentation",
    title: "Fermentation",
    value: wine.fermentationType
      ? formatLabel(wine.fermentationType)
      : "Not specified",
    icon: fermentationIcons[moodTheme] || fermentationIcons.default,
  },
  {
    id: "appellation",
    title: "Appellation",
    value: wine.appellation || "Not specified",
    icon: appellationIcons[moodTheme] || appellationIcons.default,
  },
];