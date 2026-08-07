import type {
  PublicWaitDestination,
  PublicWaitDestinationsResponse,
  PublicWaitHomepageResponse,
  PublicWaitPark,
} from "@/types/public-waits";

const PUBLIC_WAITS_PATH = "/api/v1/public/waits";

export class PublicWaitsApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
  ) {
    super(message);
    this.name = "PublicWaitsApiError";
  }
}

function backendBaseUrl(): string {
  const value = process.env.PAM_BACKEND_BASE_URL?.trim();
  if (!value) {
    throw new PublicWaitsApiError(
      "PAM_BACKEND_BASE_URL is not configured for this deployment.",
    );
  }
  return value.replace(/\/$/, "");
}

async function getPublicWaits<T>(path: string): Promise<T> {
  const response = await fetch(`${backendBaseUrl()}${PUBLIC_WAITS_PATH}${path}`, {
    headers: { Accept: "application/json" },
    next: { revalidate: 30 },
  });

  if (!response.ok) {
    throw new PublicWaitsApiError(
      `Public waits request failed (${response.status}).`,
      response.status,
    );
  }

  return (await response.json()) as T;
}

export function getPublicWaitDestinations(): Promise<PublicWaitDestinationsResponse> {
  return getPublicWaits<PublicWaitDestinationsResponse>("/destinations");
}

export function getHomepageWaits(): Promise<PublicWaitHomepageResponse> {
  return getPublicWaits<PublicWaitHomepageResponse>("/homepage");
}

export function getDestinationWaits(destinationId: string): Promise<PublicWaitDestination> {
  return getPublicWaits<PublicWaitDestination>(
    `/destinations/${encodeURIComponent(destinationId)}`,
  );
}

export function getParkWaits(parkId: string): Promise<PublicWaitPark> {
  return getPublicWaits<PublicWaitPark>(`/parks/${encodeURIComponent(parkId)}`);
}
