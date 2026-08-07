import type { Metadata } from "next";
import { SiteFooter } from "@/components/branding/SiteFooter";
import { SiteHeader } from "@/components/branding/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://parksandmore.tv"),
  title: {
    default: "Parks & More | Resort TV, Music & Park Information",
    template: "%s | Parks & More",
  },
  description:
    "Parks & More brings the resort experience home with Resort TV, music, destination information, attraction waits, and future planning tools.",
  openGraph: {
    title: "Parks & More",
    description: "Bringing the resort experience home.",
    type: "website",
    url: "https://parksandmore.tv",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="stars" aria-hidden="true" />
        <SiteHeader />
        <main className="shell page-shell">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
