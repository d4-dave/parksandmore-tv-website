import type { Metadata } from "next";

export const metadata: Metadata = { title: "Music" };

const playlists = [
  ["WDW", "Contemporary Resort", "Smooth jazz and instrumental selections associated with Disney's Contemporary Resort.", "https://open.spotify.com/playlist/5xRKSFfh1PM4E2n9szEXB1?si=2a97acb489a64191"],
  ["EPCOT", "Entrance Area Music", "Cinematic and uplifting music from the EPCOT entrance-area loop.", "https://open.spotify.com/playlist/0IT4Ci3w25OgaAXMyFdyyw?si=517a6386242d416e"],
  ["Hollywood Studios", "Sunset Boulevard", "Vintage big-band and period music associated with Sunset Boulevard and the Tower of Terror area.", "https://open.spotify.com/playlist/1UbZohzEqqu1XYAN1WuFAD?si=02a9b1b7f16443b4"],
  ["Hollywood Studios", "Entrance Area Music", "Film, television, and orchestral themes from the former park-entrance loop.", "https://open.spotify.com/playlist/2JzM2oON8PdqSwNKfnryEl?si=4276b71060b24961"],
  ["Disney Springs", "Town Center Daytime", "Relaxed global, lounge, and electronic selections associated with Town Center during the day.", "https://open.spotify.com/playlist/3CPyfyn5hp6mmMOt5zF8iM?si=b540194ae8c14c88"],
  ["Animal Kingdom", "Discovery Island", "World music, percussion, and atmospheric selections associated with Discovery Island.", "https://open.spotify.com/playlist/4gVj3G4VNmGIZrIB9qrDg1?si=c5f542fe914244bd"],
] as const;

export default function MusicPage() {
  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">Listen</p>
        <h1>Music</h1>
        <p>Fan-curated resort, park, and area-music playlists from the existing Parks &amp; More collection.</p>
      </section>
      <section className="section">
        <div className="playlist-grid">
          {playlists.map(([kicker, title, description, href]) => (
            <a className="playlist-card" href={href} target="_blank" rel="noopener noreferrer" key={href}>
              <span className="eyebrow">{kicker}</span>
              <h2>{title}</h2>
              <p>{description}</p>
              <strong>Open on Spotify <span aria-hidden="true">↗</span></strong>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
