import { AttractionWaitCard } from "@/components/waits/AttractionWaitCard";
import type { PublicWaitPark } from "@/types/public-waits";

export function ParkWaitGroup({ park }: { park: PublicWaitPark }) {
  return (
    <section className="park-group" aria-labelledby={`park-${park.id}`}>
      <div className="park-group-heading">
        <div>
          <p className="eyebrow">Park</p>
          <h2 id={`park-${park.id}`}>{park.name}</h2>
        </div>
        {!park.dataAvailable || park.errorState ? (
          <p className="availability-note" role="status">
            {park.errorState ? "Some current park data is unavailable." : "Current park data is unavailable."}
          </p>
        ) : park.isStale ? (
          <p className="availability-note" role="status">Park data includes stale observations.</p>
        ) : null}
      </div>

      {park.attractions.length > 0 ? (
        <div className="wait-grid">
          {park.attractions.map((attraction) => (
            <AttractionWaitCard key={attraction.id} attraction={attraction} timeZone={park.timezone} />
          ))}
        </div>
      ) : (
        <div className="state-panel">No curated attraction data is available for this park.</div>
      )}
    </section>
  );
}
