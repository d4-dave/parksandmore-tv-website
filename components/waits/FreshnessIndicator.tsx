import { formatObservedTime } from "@/lib/formatting/dateTime";
import { attractionFreshnessLabel } from "@/lib/waits/presentation";
import type { PublicWaitAttraction } from "@/types/public-waits";

export function FreshnessIndicator({
  attraction,
  timeZone,
}: {
  attraction: PublicWaitAttraction;
  timeZone: string;
}) {
  const observed = formatObservedTime(attraction.observedAt, timeZone);
  const label = attractionFreshnessLabel(attraction);

  return (
    <p className={`freshness freshness-${attraction.dataState.toLowerCase()}`}>
      <span>{label}</span>
      {observed && label !== "Unavailable" ? <span> · observed {observed}</span> : null}
    </p>
  );
}
