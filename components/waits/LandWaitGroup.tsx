import { AttractionWaitCard } from "@/components/waits/AttractionWaitCard";
import type { PublicWaitArea, PublicWaitAttraction } from "@/types/public-waits";

export function LandWaitGroup({
  area,
  attractions,
  timeZone,
}: {
  area: PublicWaitArea;
  attractions: PublicWaitAttraction[];
  timeZone: string;
}) {
  if (attractions.length === 0) return null;

  return (
    <section className="area-group" aria-labelledby={`area-${area.id}`}>
      <div className="area-group-heading">
        <p className="eyebrow">Land / Area</p>
        <h3 id={`area-${area.id}`}>{area.name}</h3>
      </div>
      <div className="wait-grid">
        {attractions.map((attraction) => (
          <AttractionWaitCard key={attraction.id} attraction={attraction} timeZone={timeZone} />
        ))}
      </div>
    </section>
  );
}
