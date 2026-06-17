import { WineGlassLoader } from "@/components/ui/WineGlassLoader";

export const CatalogLoader = () => {
  return (
    <div className="catalog-page__loader-wrapper">
      <div className="catalog-page__loader-glow" />
      <WineGlassLoader />
    </div>
  );
};