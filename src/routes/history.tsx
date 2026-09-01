import { useLoaderData } from "react-router";

import {
  getHistoryOrigins,
  getHistoryTimeline,
  getHistoryWomanImages,
} from "@/shared/api/assets/historyAssetsApi";

import { getSiteAssets } from "@/shared/api/assets/siteAssetsApi";

import { HistoryPage } from "@/pages/HistoryPage";

export async function loader() {
  const [
    origins,
    timelineItems,
    womanImages,
    siteAssets,
  ] = await Promise.all([
    getHistoryOrigins(),
    getHistoryTimeline(),
    getHistoryWomanImages(),
    getSiteAssets(),
  ]);

  return {
    origins,
    timelineItems,
    womanImages,
    siteAssets,
  };
}

export default function History() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <HistoryPage
      origins={loaderData.origins}
      timelineItems={loaderData.timelineItems}
      womanImages={loaderData.womanImages}
      siteAssets={loaderData.siteAssets}
    />
  );
}