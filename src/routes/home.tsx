import {
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

import {
  useLoaderData,
} from "react-router";

import { HomePage } from "@/pages/HomePage";

import { useAppLoading } from "@/context/AppLoadingContext";

import { getSiteAssets } from "@/shared/api/assets/siteAssetsApi";
import { getMoodAssets } from "@/shared/api/assets/assetsMoodApi";
import { getCategories } from "@/shared/api/categoryApi";
import { getCountries } from "@/shared/api/countryApi";

const RECOVERY_RETRY_DELAY_MS = 3_000;

export async function loader() {
  const [
    siteAssetsResult,
    moodsResult,
    categoriesResult,
    countriesResult,
  ] = await Promise.allSettled([
    getSiteAssets(),
    getMoodAssets(),
    getCategories(),
    getCountries(),
  ]);

  if (
    siteAssetsResult.status ===
    "rejected"
  ) {
    console.error(
      "[Home loader] Failed to load site assets:",
      siteAssetsResult.reason,
    );
  }

  if (
    moodsResult.status ===
    "rejected"
  ) {
    console.error(
      "[Home loader] Failed to load moods:",
      moodsResult.reason,
    );
  }

  if (
    categoriesResult.status ===
    "rejected"
  ) {
    console.error(
      "[Home loader] Failed to load categories:",
      categoriesResult.reason,
    );
  }

  if (
    countriesResult.status ===
    "rejected"
  ) {
    console.error(
      "[Home loader] Failed to load countries:",
      countriesResult.reason,
    );
  }

  const needsClientRecovery =
    siteAssetsResult.status ===
      "rejected" ||
    moodsResult.status ===
      "rejected" ||
    categoriesResult.status ===
      "rejected" ||
    countriesResult.status ===
      "rejected";

  return {
    heroBackgroundUrl:
      siteAssetsResult.status ===
      "fulfilled"
        ? siteAssetsResult.value.home
            .heroBackgroundUrl
        : "",

    moods:
      moodsResult.status ===
      "fulfilled"
        ? moodsResult.value
        : [],

    categories:
      categoriesResult.status ===
      "fulfilled"
        ? categoriesResult.value
        : [],

    countries:
      countriesResult.status ===
      "fulfilled"
        ? countriesResult.value
        : [],

    needsClientRecovery,
  };
}

export default function Home() {
  const loaderData =
    useLoaderData<typeof loader>();

  const {
    startBackendLoading,
    stopBackendLoading,
  } = useAppLoading();

  const [
    heroBackgroundUrl,
    setHeroBackgroundUrl,
  ] = useState(
    loaderData.heroBackgroundUrl,
  );

  const [
    moods,
    setMoods,
  ] = useState(
    loaderData.moods,
  );

  const [
    categories,
    setCategories,
  ] = useState(
    loaderData.categories,
  );

  const [
    countries,
    setCountries,
  ] = useState(
    loaderData.countries,
  );

  const [
    isRecovering,
    setIsRecovering,
  ] = useState(
    loaderData.needsClientRecovery,
  );

  useLayoutEffect(() => {
    if (
      loaderData.needsClientRecovery
    ) {
      startBackendLoading();
    }
  }, [
    loaderData.needsClientRecovery,
    startBackendLoading,
  ]);

  useEffect(() => {
    if (
      !loaderData.needsClientRecovery
    ) {
      stopBackendLoading();

      return;
    }

    let isCancelled = false;

    let retryTimer:
      | ReturnType<
          typeof setTimeout
        >
      | undefined;

    const recover =
      async () => {
        const [
          siteAssetsResult,
          moodsResult,
          categoriesResult,
          countriesResult,
        ] =
          await Promise.allSettled([
            getSiteAssets(),
            getMoodAssets(),
            getCategories(),
            getCountries(),
          ]);

        if (isCancelled) {
          return;
        }

        const hasFailure =
          siteAssetsResult.status ===
            "rejected" ||
          moodsResult.status ===
            "rejected" ||
          categoriesResult.status ===
            "rejected" ||
          countriesResult.status ===
            "rejected";

        if (hasFailure) {
          retryTimer = setTimeout(
            recover,
            RECOVERY_RETRY_DELAY_MS,
          );

          return;
        }

        setHeroBackgroundUrl(
          siteAssetsResult.value.home
            .heroBackgroundUrl,
        );

        setMoods(
          moodsResult.value,
        );

        setCategories(
          categoriesResult.value,
        );

        setCountries(
          countriesResult.value,
        );

        setIsRecovering(false);

        stopBackendLoading();
      };

    void recover();

    return () => {
      isCancelled = true;

      if (retryTimer) {
        clearTimeout(
          retryTimer,
        );
      }

      stopBackendLoading();
    };
  }, [
    loaderData.needsClientRecovery,
    stopBackendLoading,
  ]);

  if (isRecovering) {
    return null;
  }

  return (
    <HomePage
      heroBackgroundUrl={
        heroBackgroundUrl
      }
      moods={moods}
      categories={categories}
      countries={countries}
    />
  );
}