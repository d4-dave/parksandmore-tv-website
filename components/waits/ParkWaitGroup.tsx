import { LandWaitGroup } from "@/components/waits/LandWaitGroup";
import type { PublicWaitAttraction, PublicWaitPark } from "@/types/public-waits";

function attractionsForArea(park: PublicWaitPark, attractionIds: string[]): PublicWaitAttraction[] {
  const byId = new Map(park.attractions.map((attraction) => [attraction.id, attraction]));
  return attractionIds.flatMap((id) => {
    const attraction = byId.get(id);
    return attraction ? [attraction] : [];
  });
}

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
          <p className="availability-note" role="status">Some park information is cached.</p>
        ) : null}
      </div>

      {park.areas.length > 0 ? (
        <div className="area-list">
          {park.areas.map((area) => (
            <LandWaitGroup
              key={area.id}
              area={area}
              attractions={attractionsForArea(park, area.attractionIds)}
              timeZone={park.timezone}
            />
          ))}
        </div>
      ) : park.attractions.length > 0 ? (
        <div className="state-panel" role="status">
          Land / area grouping is temporarily unavailable for this park.
        </div>
      ) : (
        <div className="state-panel">No destination wait attraction data is available for this park.</div>
      )}
    </section>
  );
}
