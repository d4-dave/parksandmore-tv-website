import Link from "next/link";
import { PrimaryNav } from "@/components/navigation/PrimaryNav";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="Parks and More home">
          <span className="brand-name">Parks &amp; More</span>
          <span className="brand-tagline">Bringing the resort experience home</span>
        </Link>
        <PrimaryNav />
      </div>
    </header>
  );
}
