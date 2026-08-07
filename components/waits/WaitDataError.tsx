export function WaitDataError({ message = "Live wait information is temporarily unavailable." }: { message?: string }) {
  return (
    <div className="state-panel state-panel-error" role="status">
      <strong>Live information unavailable</strong>
      <span>{message}</span>
    </div>
  );
}
