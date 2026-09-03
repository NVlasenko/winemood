import {
  useLoaderData,
} from "react-router";

import { HomePage } from "@/pages/HomePage";

import { getSiteAssets } from "@/shared/api/assets/siteAssetsApi";
import { getMoodAssets } from "@/shared/api/assets/assetsMoodApi";
import { getCategories } from "@/shared/api/categoryApi";
import { getCountries } from "@/shared/api/countryApi";

export async function loader() {
  const [
    siteAssets,
    moods,
    categories,
    countries,
  ] = await Promise.all([
    getSiteAssets(),
    getMoodAssets(),
    getCategories(),
    getCountries(),
  ]);

  return {
    heroBackgroundUrl:
      siteAssets.home
        .heroBackgroundUrl,

    moods,

    categories,

    countries,
  };
}

export default function Home() {
  const {
    heroBackgroundUrl,
    moods,
    categories,
    countries,
  } =
    useLoaderData<
      typeof loader
    >();

  return (
    <HomePage
      heroBackgroundUrl={
        heroBackgroundUrl
      }
      moods={moods}
      categories={
        categories
      }
      countries={
        countries
      }
    />
  );
}