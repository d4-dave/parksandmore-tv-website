import type { Metadata } from "next";
import Link from "next/link";
import { WaitDataError } from "@/components/waits/WaitDataError";
import { getPublicWaitDestinations } from "@/lib/api/waits";
import { destinationRouteById } from "@/lib/routes/destinations";
import type { PublicWaitDestinationsResponse } from "@/types/public-waits";

export const metadata: Metadata = { title: "Attraction Wait Times" };

export default async function WaitTimesPage() {
  let response: PublicWaitDestinationsResponse | null = null;

  try {
    response = await getPublicWaitDestinations();
  } catch {
    // Render the page shell with a scoped data error below.
  }

  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">Live utility</p>
        <h1>Attraction Wait Times</h1>
        <p>Current curated standby waits, operating states, and Backend-owned freshness information.</p>
      </section>
      {response ? (
        <section className="section destination-grid" aria-label="Wait time destinations">
          {response.destinations.map((destination) => {
            const route = destinationRouteById(destination.id);
            return (
              <article className="destination-card" key={destination.id}>
                <p className="eyebrow">Wait times</p>
                <h2>{destination.name}</h2>
                <p>{destination.parkIds.length} supported park{destination.parkIds.length === 1 ? "" : "s"}</p>
                {route ? <Link className="button-link" href={`/wait-times/${route.slug}`}>View wait times</Link> : null}
              </article>
            );
          })}
        </section>
      ) : (
        <WaitDataError />
      )}
    </>
  );
}
