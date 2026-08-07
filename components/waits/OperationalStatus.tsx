import { operatingStateLabel } from "@/lib/waits/presentation";
import type { OperatingState } from "@/types/public-waits";

export function OperationalStatus({ state }: { state: OperatingState }) {
  return (
    <span className={`status-badge status-${state.toLowerCase().replaceAll("_", "-")}`}>
      {operatingStateLabel(state)}
    </span>
  );
}
