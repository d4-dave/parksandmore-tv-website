import Link from "next/link";
export default function NotFound() {
  return <section className="page-hero narrow-page"><p className="eyebrow">404</p><h1>Page not found</h1><p>The page you requested is not available.</p><Link className="button-link" href="/">Return home</Link></section>;
}
