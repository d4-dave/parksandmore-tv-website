import { FreshnessIndicator } from "@/components/waits/FreshnessIndicator";
import { OperationalStatus } from "@/components/waits/OperationalStatus";
import { WaitValue } from "@/components/waits/WaitValue";
import type { PublicWaitAttraction } from "@/types/public-waits";

export function AttractionWaitCard({
  attraction,
  timeZone,
  showPark = false,
}: {
  attraction: PublicWaitAttraction;
  timeZone: string;
  showPark?: boolean;
}) {
  return (
    <article className={`wait-card ${attraction.isStale ? "is-stale" : ""}`}>
      <div className="wait-card-heading">
        <div>
          {showPark ? <p className="card-kicker">{attraction.parkName}</p> : null}
          <h3>{attraction.name}</h3>
        </div>
        <OperationalStatus state={attraction.operatingState} />
      </div>
      <WaitValue attraction={attraction} />
      <FreshnessIndicator attraction={attraction} timeZone={timeZone} />
    </article>
  );
}
