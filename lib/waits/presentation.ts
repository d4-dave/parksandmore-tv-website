import type { OperatingState, PublicWaitAttraction } from "@/types/public-waits";

const statusLabels: Record<OperatingState, string> = {
  OPERATING: "Operating",
  TEMPORARILY_CLOSED: "Temporarily closed",
  CLOSED: "Closed",
  REFURBISHMENT: "Refurbishment",
  UNKNOWN: "Status unavailable",
};

export function operatingStateLabel(state: OperatingState): string {
  return statusLabels[state];
}

export function shouldDisplayStandbyWait(attraction: PublicWaitAttraction): boolean {
  return attraction.waitAvailable && attraction.standbyWaitMinutes !== null;
}

export function attractionFreshnessLabel(attraction: PublicWaitAttraction): string {
  if (attraction.dataState === "MISSING") return "Current data unavailable";
  if (attraction.isStale || attraction.dataState === "STALE") return "Last reported data";
  return "Current data";
}
