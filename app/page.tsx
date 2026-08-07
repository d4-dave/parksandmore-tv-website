import { ProjectTiles } from "@/components/navigation/ProjectTiles";
import { ResortStatusBar } from "@/components/status/ResortStatusBar";
import { DestinationWaitSection } from "@/components/waits/DestinationWaitSection";
import { WaitDataError } from "@/components/waits/WaitDataError";
import { getHomepageWaits } from "@/lib/api/waits";

export default async function HomePage() {
  let waits = null;
  let error = false;

  try {
    waits = await getHomepageWaits();
  } catch {
    error = true;
  }

  return (
    <>
      <section className="home-hero">
        <p className="eyebrow">Bringing the resort experience home</p>
        <h1>Parks &amp; More</h1>
        <p className="hero-copy">
          Resort TV, park music, destination information, live attraction waits, and a growing home for approved planning tools.
        </p>
      </section>

      <ProjectTiles />
      <ResortStatusBar />

      <section className="section" aria-labelledby="live-heading">
        <div className="section-heading">
          <p className="eyebrow">Live utility</p>
          <h2 id="live-heading">Top attraction wait times</h2>
          <p>Curated by the Parks &amp; More Backend for quick destination-level visibility.</p>
        </div>
      </section>

      {error ? <WaitDataError /> : null}
      {waits?.destinations.map((destination) => (
        <DestinationWaitSection key={destination.id} destination={destination} />
      ))}

      <section className="section promo-panel" aria-labelledby="music-promo-heading">
        <div>
          <p className="eyebrow">Music</p>
          <h2 id="music-promo-heading">Take the parks with you</h2>
          <p>Explore the playlist collection already featured on Parks &amp; More.</p>
        </div>
        <a className="button-link" href="/music">Explore Music</a>
      </section>
    </>
  );
}
