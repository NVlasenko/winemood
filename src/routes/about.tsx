import { useLoaderData } from "react-router";

import { AboutPage } from "@/pages/AboutPage";

import { getSiteAssets } from "@/shared/api/assets/siteAssetsApi";

export async function loader() {
  const siteAssets = await getSiteAssets();

  return {
    siteAssets,
  };
}

export default function About() {
  const { siteAssets } =
    useLoaderData<typeof loader>();

  return (
    <AboutPage
      siteAssets={siteAssets}
    />
  );
}