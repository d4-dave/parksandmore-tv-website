"use client";
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="page-hero narrow-page">
      <p className="eyebrow">Something went wrong</p>
      <h1>We couldn&apos;t load this page.</h1>
      <p>Live information may be temporarily unavailable.</p>
      <button className="button-link button-reset" type="button" onClick={() => reset()}>Try again</button>
    </section>
  );
}
