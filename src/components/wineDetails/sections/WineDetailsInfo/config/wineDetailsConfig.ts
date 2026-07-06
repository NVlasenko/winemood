import type { ComponentType, SVGProps } from "react";

import type { Wine } from "@/types/wine";
import { formatLabel } from "@/utils/formatLabel";

import AgingIcon from "@/assets/images/wineDetailsInfo/images/aging-default.svg?react";
import AppellationIcon from "@/assets/images/wineDetailsInfo/images/appellation-default.svg?react";
import EcoIcon from "@/assets/images/wineDetailsInfo/images/eco-default.svg?react";
import FermentationIcon from "@/assets/images/wineDetailsInfo/images/fermentation-default.svg?react";
import GrapeIcon from "@/assets/images/wineDetailsInfo/images/grape-default.svg?react";
import ProducerIcon from "@/assets/images/wineDetailsInfo/images/producer-default.svg?react";

type WineDetailsItem = {
  id: string;
  title: string;
  value: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const getWineDetails = (wine: Wine): WineDetailsItem[] => [
  {
    id: "grape-variety",
    title: "Grape variety",
    value: wine.grapeVariety
      ? `100% ${formatLabel(wine.grapeVariety.name)}`
      : "Unknown",
    Icon: GrapeIcon,
  },
  {
    id: "producer",
    title: "Producer",
    value: wine.producerName || "Unknown",
    Icon: ProducerIcon,
  },
  {
    id: "aging",
    title: "Aging",
    value: wine.agingMonths
      ? `${wine.agingMonths} months total`
      : "Not specified",
    Icon: AgingIcon,
  },
  {
    id: "ecological-attributes",
    title: "Ecological attributes",
    value: wine.environmentalAttributes?.length
      ? wine.environmentalAttributes.map(formatLabel).join(" / ")
      : "Not specified",
    Icon: EcoIcon,
  },
  {
    id: "fermentation",
    title: "Fermentation",
    value: wine.fermentationType
      ? formatLabel(wine.fermentationType)
      : "Not specified",
    Icon: FermentationIcon,
  },
  {
    id: "appellation",
    title: "Appellation",
    value: wine.appellation || "Not specified",
    Icon: AppellationIcon,
  },
];