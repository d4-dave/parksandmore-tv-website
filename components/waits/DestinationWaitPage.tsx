import { ParkWaitGroup } from "@/components/waits/ParkWaitGroup";
import { WaitDataError } from "@/components/waits/WaitDataError";
import { getDestinationWaits } from "@/lib/api/waits";
import type { PublicWaitDestination } from "@/types/public-waits";

export async function DestinationWaitPage({ destinationId }: { destinationId: string }) {
  let destination: PublicWaitDestination | null = null;

  try {
    destination = await getDestinationWaits(destinationId);
  } catch {
    // Render the scoped data error below.
  }

  if (!destination) {
    return <WaitDataError />;
  }

  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">Attraction wait times</p>
        <h1>{destination.name}</h1>
        <p>Backend-curated destination wait attractions grouped by park. Stale and unavailable information remains visible and labeled.</p>
      </section>
      {!destination.dataAvailable ? <WaitDataError message="Current destination wait information is temporarily unavailable." /> : null}
      {destination.isStale ? <p className="section-status prominent-status" role="status">Some destination information is stale. Last-reported values are labeled.</p> : null}
      {destination.parks.map((park) => <ParkWaitGroup key={park.id} park={park} />)}
    </>
  );
}
