import type { Metadata } from "next";
import { DestinationWaitPage } from "@/components/waits/DestinationWaitPage";
export const metadata: Metadata = { title: "Universal Orlando Wait Times" };
export default function Page() { return <DestinationWaitPage destinationId="uor" />; }
