import { HomePage } from "@/pages/HomePage";

type SiteAssets = {
  home: {
    heroBackgroundUrl: string;
  };
};

export async function loader(): Promise<SiteAssets> {
  const response = await fetch(
    "https://wine-mood-backend.onrender.com/api/assets/site",
  );

  if (!response.ok) {
    throw new Response("Failed to load site assets", {
      status: response.status,
    });
  }

  return (await response.json()) as SiteAssets;
}

type HomeProps = {
  loaderData: SiteAssets;
};

export default function Home({
  loaderData,
}: HomeProps) {
  return (
    <HomePage
      heroBackgroundUrl={
        loaderData.home.heroBackgroundUrl
      }
    />
  );
}