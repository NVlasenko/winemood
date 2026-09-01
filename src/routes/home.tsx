import { useLoaderData } from "react-router";

import { HomePage } from "@/pages/HomePage";

import { getSiteAssets } from "@/shared/api/assets/siteAssetsApi";
import { getMoodAssets } from "@/shared/api/assets/assetsMoodApi";
import { getCategories } from "@/shared/api/categoryApi";
import { getCountries } from "@/shared/api/countryApi";

const measure = async <T,>(
  name: string,
  request: () => Promise<T>,
): Promise<T> => {
  const startedAt = performance.now();

  try {
    const result = await request();

    console.log(
      `[HOME SSR] ${name}: ${Math.round(
        performance.now() - startedAt,
      )}ms`,
    );

    return result;
  } catch (error) {
    console.error(
      `[HOME SSR] ${name} FAILED after ${Math.round(
        performance.now() - startedAt,
      )}ms`,
      error,
    );

    throw error;
  }
};

export async function loader() {
  const startedAt = performance.now();

  console.log(
    "[HOME SSR] loader started",
  );

  const [
    siteAssets,
    moods,
    categories,
    countries,
  ] = await Promise.all([
    measure(
      "siteAssets",
      getSiteAssets,
    ),
    measure(
      "moods",
      getMoodAssets,
    ),
    measure(
      "categories",
      getCategories,
    ),
    measure(
      "countries",
      getCountries,
    ),
  ]);

  console.log(
    `[HOME SSR] loader finished: ${Math.round(
      performance.now() - startedAt,
    )}ms`,
  );

  return {
    siteAssets,
    moods,
    categories,
    countries,
  };
}

export default function Home() {
  const loaderData =
    useLoaderData<typeof loader>();

  return (
    <HomePage
      heroBackgroundUrl={
        loaderData.siteAssets.home
          .heroBackgroundUrl
      }
      moods={loaderData.moods}
      categories={
        loaderData.categories
      }
      countries={
        loaderData.countries
      }
    />
  );
}