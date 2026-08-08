import { ParkWaitGroup } from "@/components/waits/ParkWaitGroup";
import { WaitDataError } from "@/components/waits/WaitDataError";
import { getDestinationWaits } from "@/lib/api/waits";

export async function DestinationWaitPage({ destinationId }: { destinationId: string }) {
  let destination;

  try {
    destination = await getDestinationWaits(destinationId);
  } catch {
    return <WaitDataError />;
  }

  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">Attraction wait times</p>
        <h1>{destination.name}</h1>
        <p>Guest-relevant standby attractions grouped by park and land / area using Backend-owned membership and ordering.</p>
      </section>
      {!destination.dataAvailable ? <WaitDataError message="Current destination wait information is temporarily unavailable." /> : null}
      {destination.isStale ? <p className="section-status prominent-status" role="status">Some destination information is cached. Cached items are labeled below.</p> : null}
      {destination.parks.map((park) => <ParkWaitGroup key={park.id} park={park} />)}
    </>
  );
}
