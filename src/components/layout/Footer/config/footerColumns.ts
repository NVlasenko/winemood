import {
  discoveryLinks,
  resourceLinks,
  socialLinks,
} from "@/data/footerLinks";

export const FOOTER_COLUMNS = [
  {
    title: "Discovery",
    links: discoveryLinks,
  },
  {
    title: "Resources",
    links: resourceLinks,
  },
  {
    title: "Social",
    links: socialLinks,
  },
] as const;