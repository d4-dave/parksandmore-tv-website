export type OperatingState =
  | "OPERATING"
  | "TEMPORARILY_CLOSED"
  | "CLOSED"
  | "REFURBISHMENT"
  | "UNKNOWN";

export type PublicWaitDataState = "CURRENT" | "STALE" | "MISSING";
export type PublicWaitCurationContext = "HOMEPAGE_TOP" | "DESTINATION_WAITS";

export interface PublicWaitLastObservation {
  operatingState: OperatingState;
  standbyWaitMinutes: number | null;
  waitAvailable: boolean;
  observedAt: string | null;
  isStale: boolean;
  dataState: PublicWaitDataState;
}

export interface PublicWaitAttraction {
  id: string;
  name: string;
  parkId: string;
  parkName: string;
  destinationId: string;
  destinationName: string;
  curationContexts: PublicWaitCurationContext[];
  homepageOrder: number | null;
  destinationOrder: number | null;
  areaId: string | null;
  areaName: string | null;
  areaOrder: number | null;
  areaAttractionOrder: number | null;
  operatingState: OperatingState;
  standbyWaitMinutes: number | null;
  waitAvailable: boolean;
  availabilityReason: string | null;
  observedAt: string | null;
  generatedAt: string;
  isStale: boolean;
  dataState: PublicWaitDataState;
  lastObservation: PublicWaitLastObservation | null;
}

export interface PublicWaitArea {
  id: string;
  name: string;
  order: number;
  attractionIds: string[];
}

export interface PublicWaitDestinationSummary {
  id: string;
  name: string;
  timezone: string;
  parkIds: string[];
}

export interface PublicWaitDestinationsResponse {
  generatedAt: string;
  destinations: PublicWaitDestinationSummary[];
}

export interface PublicWaitHomepageDestination {
  id: string;
  name: string;
  timezone: string;
  generatedAt: string;
  isStale: boolean;
  dataAvailable: boolean;
  attractions: PublicWaitAttraction[];
}

export interface PublicWaitPark {
  id: string;
  name: string;
  destinationId: string;
  timezone: string;
  support: string;
  dataAvailable: boolean;
  generatedAt: string;
  observedAt: string | null;
  isStale: boolean;
  errorState: string | null;
  areas: PublicWaitArea[];
  attractions: PublicWaitAttraction[];
}

export interface PublicWaitDestination {
  id: string;
  name: string;
  timezone: string;
  generatedAt: string;
  isStale: boolean;
  dataAvailable: boolean;
  parks: PublicWaitPark[];
}

export interface PublicWaitHomepageResponse {
  generatedAt: string;
  destinations: PublicWaitHomepageDestination[];
}
