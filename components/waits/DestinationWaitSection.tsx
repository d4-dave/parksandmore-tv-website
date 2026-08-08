import Link from "next/link";
import { AttractionWaitCard } from "@/components/waits/AttractionWaitCard";
import { destinationRouteById } from "@/lib/routes/destinations";
import type { PublicWaitHomepageDestination } from "@/types/public-waits";

export function DestinationWaitSection({ destination }: { destination: PublicWaitHomepageDestination }) {
  const route = destinationRouteById(destination.id);
  const waitHref = route ? `/wait-times/${route.slug}` : "/wait-times";

  return (
    <section className="section destination-section" aria-labelledby={`destination-${destination.id}`}>
      <div className="section-heading split-heading">
        <div>
          <p className="eyebrow">Top attractions</p>
          <h2 id={`destination-${destination.id}`}>{destination.name}</h2>
        </div>
        <Link className="text-link" href={waitHref}>
          View destination wait times <span aria-hidden="true">→</span>
        </Link>
      </div>

      {!destination.dataAvailable ? (
        <div className="state-panel" role="status">
          Current wait information for this destination is temporarily unavailable.
        </div>
      ) : null}

      {destination.isStale ? (
        <p className="section-status" role="status">
          Some attraction information is cached. Cached items are labeled below.
        </p>
      ) : null}

      {destination.attractions.length > 0 ? (
        <div className="wait-grid homepage-wait-grid">
          {destination.attractions.map((attraction) => (
            <AttractionWaitCard
              key={attraction.id}
              attraction={attraction}
              timeZone={destination.timezone}
              showPark
            />
          ))}
        </div>
      ) : (
        <div className="state-panel">No homepage attraction data is currently available.</div>
      )}
    </section>
  );
}
