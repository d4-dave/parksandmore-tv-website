import type { Metadata } from "next";

export const metadata: Metadata = { title: "Resort TV" };

export default function ResortTvPage() {
  return (
    <section className="page-hero narrow-page">
      <p className="eyebrow">Parks &amp; More</p>
      <h1>Resort TV</h1>
      <p>Resort-style information and entertainment programming is being prepared for a future approved public experience.</p>
    </section>
  );
}
