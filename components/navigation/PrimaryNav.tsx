import Link from "next/link";

const links = [
  { href: "/resort-tv", label: "Resort TV" },
  { href: "/music", label: "Music" },
  { href: "/destinations", label: "Destinations" },
  { href: "/more", label: "More" },
];

export function PrimaryNav() {
  return (
    <nav aria-label="Primary navigation">
      <ul className="primary-nav">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
