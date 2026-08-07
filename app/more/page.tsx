import type { Metadata } from "next";
export const metadata: Metadata = { title: "More" };
export default function MorePage() {
  return (
    <section className="page-hero narrow-page">
      <p className="eyebrow">Planning</p>
      <h1>More</h1>
      <p>This area will expand as additional Parks &amp; More planning tools are separately approved and implemented.</p>
    </section>
  );
}
