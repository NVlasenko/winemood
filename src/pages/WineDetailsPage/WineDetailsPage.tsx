import { useParams } from "react-router-dom";
import { WineDetails } from "@/components/wineDetails/WineDetails";
import { WineDetailsErrorState } from "@/components/wineDetails/sections/WineDetailsErrorState";
import { WineDetailsLoader } from "@/components/wineDetails/sections/WineDetailsLoader";
import { WineDetailsNotFoundState } from "@/components/wineDetails/sections/WineDetailsNotFoundState";

import { useWineDetails } from "@/hooks/wineDetails";

import "./WineDetailsPage.scss";

export const WineDetailsPage = () => {
  const { id } = useParams();

  const { wine, isLoading, error } = useWineDetails(id);

  return (
    <main className="wine-details-page">
      {isLoading && <WineDetailsLoader />}

      {!isLoading && error && <WineDetailsErrorState message={error} />}

      {!isLoading && !error && !wine && <WineDetailsNotFoundState />}

      {!isLoading && !error && wine && <WineDetails wine={wine} />}
    </main>
  );
};