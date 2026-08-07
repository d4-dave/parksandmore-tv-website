export function DestinationHero({ name, description }: { name: string; description: string }) {
  return (
    <section className="page-hero">
      <p className="eyebrow">Destination</p>
      <h1>{name}</h1>
      <p>{description}</p>
    </section>
  );
}
