export interface PublicDestinationRoute {
  slug: string;
  destinationId: string;
  fallbackName: string;
}

// This mapping controls human-readable Web routes only.
// Backend IDs remain authoritative operational identity.
export const publicDestinationRoutes: PublicDestinationRoute[] = [
  {
    slug: "walt-disney-world",
    destinationId: "wdw",
    fallbackName: "Walt Disney World Resort",
  },
  {
    slug: "universal-orlando",
    destinationId: "uor",
    fallbackName: "Universal Orlando Resort",
  },
];

export function destinationRouteBySlug(slug: string): PublicDestinationRoute | undefined {
  return publicDestinationRoutes.find((route) => route.slug === slug);
}

export function destinationRouteById(destinationId: string): PublicDestinationRoute | undefined {
  return publicDestinationRoutes.find((route) => route.destinationId === destinationId);
}
