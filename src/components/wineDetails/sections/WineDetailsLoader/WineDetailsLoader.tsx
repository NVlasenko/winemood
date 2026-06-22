import { WineGlassLoader } from "@/components/ui/WineGlassLoader";

export const WineDetailsLoader = () => {
  return (
    <div className="wine-details-page__loader-wrapper">
      <div className="wine-details-page__loader-glow" />

      <WineGlassLoader />
    </div>
  );
};