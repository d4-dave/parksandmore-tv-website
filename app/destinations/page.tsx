import type { Metadata } from "next";
import Link from "next/link";
import { WaitDataError } from "@/components/waits/WaitDataError";
import { getPublicWaitDestinations } from "@/lib/api/waits";
import { destinationRouteById } from "@/lib/routes/destinations";
import type { PublicWaitDestinationsResponse } from "@/types/public-waits";

export const metadata: Metadata = { title: "Destinations" };

export default async function DestinationsPage() {
  let response: PublicWaitDestinationsResponse | null = null;

  try {
    response = await getPublicWaitDestinations();
  } catch {
    // Render the page shell with a scoped data error below.
  }

  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">Explore</p>
        <h1>Destinations</h1>
        <p>Destination information currently supported by the Parks &amp; More public data platform.</p>
      </section>
      {response ? (
        <section className="section destination-grid" aria-label="Supported destinations">
          {response.destinations.map((destination) => {
            const route = destinationRouteById(destination.id);
            return (
              <article className="destination-card" key={destination.id}>
                <p className="eyebrow">Destination</p>
                <h2>{destination.name}</h2>
                <p>{destination.parkIds.length} supported park{destination.parkIds.length === 1 ? "" : "s"}</p>
                {route ? <Link className="text-link" href={`/destinations/${route.slug}`}>Explore destination →</Link> : null}
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
