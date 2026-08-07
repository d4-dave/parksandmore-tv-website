import Link from "next/link";
import { DestinationHero } from "@/components/destinations/DestinationHero";
import { ParkWaitGroup } from "@/components/waits/ParkWaitGroup";
import { WaitDataError } from "@/components/waits/WaitDataError";
import { getDestinationWaits } from "@/lib/api/waits";
import { destinationRouteById } from "@/lib/routes/destinations";
import type { PublicWaitDestination } from "@/types/public-waits";

export async function DestinationPage({ destinationId }: { destinationId: string }) {
  let destination: PublicWaitDestination | null = null;

  try {
    destination = await getDestinationWaits(destinationId);
  } catch {
    // Render the scoped data error below.
  }

  if (!destination) {
    return <WaitDataError />;
  }

  const route = destinationRouteById(destination.id);

  return (
    <>
      <DestinationHero
        name={destination.name}
        description="Current destination information from the approved Parks & More public data contract."
      />
      <section className="section compact-section">
        <div className="section-heading split-heading">
          <div><p className="eyebrow">Current waits</p><h2>Featured attraction waits</h2></div>
          {route ? <Link className="text-link" href={`/wait-times/${route.slug}`}>View all curated waits →</Link> : null}
        </div>
        {destination.isStale ? <p className="section-status" role="status">Some destination information is stale and is labeled below.</p> : null}
      </section>
      {destination.parks.map((park) => <ParkWaitGroup key={park.id} park={park} />)}
    </>
  );
}
