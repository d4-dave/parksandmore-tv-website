import type { Metadata } from "next";
import { DestinationWaitPage } from "@/components/waits/DestinationWaitPage";
export const metadata: Metadata = { title: "Walt Disney World Wait Times" };
export default function Page() { return <DestinationWaitPage destinationId="wdw" />; }
