import Link from "next/link";

const tiles = [
  { href: "/resort-tv", eyebrow: "Watch", title: "Resort TV", description: "Resort-style information and entertainment programming." },
  { href: "/music", eyebrow: "Listen", title: "Music", description: "Fan-curated resort, park, and area-music playlists." },
  { href: "/destinations", eyebrow: "Explore", title: "Destinations", description: "Current park information from the destinations we support." },
  { href: "/more", eyebrow: "Plan", title: "More", description: "The home for future approved Parks & More planning tools." },
];

export function ProjectTiles() {
  return (
    <section className="section" aria-labelledby="projects-heading">
      <div className="section-heading">
        <p className="eyebrow">Parks &amp; More</p>
        <h2 id="projects-heading">Explore the projects</h2>
      </div>
      <div className="project-grid">
        {tiles.map((tile) => (
          <Link className="project-tile" key={tile.href} href={tile.href}>
            <span className="eyebrow">{tile.eyebrow}</span>
            <strong>{tile.title}</strong>
            <span>{tile.description}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
