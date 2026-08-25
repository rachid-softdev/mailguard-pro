"use client";

export default function RootError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[var(--bg-base)] flex items-center justify-center p-4">
      <div className="max-w-md text-center">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
          Something went wrong!
        </h2>
        <p className="text-[var(--text-secondary)] mb-6">An unexpected error occurred.</p>
        <button onClick={() => reset()} className="btn btn-accent btn-md">
          Try again
        </button>
      </div>
    </div>
  );
}
