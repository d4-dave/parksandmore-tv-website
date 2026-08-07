export function WaitSectionSkeleton() {
  return (
    <div className="wait-grid" aria-hidden="true">
      {[0, 1, 2, 3].map((item) => (
        <div className="wait-card skeleton-card" key={item} />
      ))}
    </div>
  );
}
