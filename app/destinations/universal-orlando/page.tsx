import type { Metadata } from "next";
import { DestinationPage } from "@/components/destinations/DestinationPage";
export const metadata: Metadata = { title: "Universal Orlando Resort" };
export default function Page() { return <DestinationPage destinationId="uor" />; }
