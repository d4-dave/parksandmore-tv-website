import type { Metadata } from "next";
import { DestinationPage } from "@/components/destinations/DestinationPage";
export const metadata: Metadata = { title: "Walt Disney World" };
export default function Page() { return <DestinationPage destinationId="wdw" />; }
