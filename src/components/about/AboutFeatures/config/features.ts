import BarrelIcon from "@/assets/images/aboutUs/icons/barrel-default.svg?react";
import PersonIcon from "@/assets/images/aboutUs/icons/person-default.svg?react";
import LocationIcon from "@/assets/images/aboutUs/icons/location-default.svg?react";
import LikeIcon from "@/assets/images/aboutUs/icons/like-default.svg?react";

export const FEATURES = [
  {
    id: 1,
    title: "UNDERSTAND WINE STYLES",
    Icon: BarrelIcon,
  },
  {
    id: 2,
    title: "BUILD PERSONAL TASTE PROFILES",
    Icon: PersonIcon,
  },
  {
    id: 3,
    title: "DISCOVER NEW REGIONS",
    Icon: LocationIcon,
  },
  {
    id: 4,
    title: "RECEIVE INTELLIGENT RECOMMENDATIONS",
    Icon: LikeIcon,
  },
] as const;