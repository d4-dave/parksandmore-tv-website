import { shouldDisplayStandbyWait } from "@/lib/waits/presentation";
import type { PublicWaitAttraction } from "@/types/public-waits";

export function WaitValue({ attraction }: { attraction: PublicWaitAttraction }) {
  if (!shouldDisplayStandbyWait(attraction)) {
    return (
      <div className="wait-value wait-value-unavailable">
        <strong>—</strong>
        <span>Wait unavailable</span>
      </div>
    );
  }

  return (
    <div className="wait-value" aria-label={`${attraction.standbyWaitMinutes} minute standby wait`}>
      <strong>{attraction.standbyWaitMinutes}</strong>
      <span>min standby</span>
    </div>
  );
}
