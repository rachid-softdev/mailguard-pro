"use client";

export default function GlobalError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center p-4">
          <div className="max-w-md text-center">
            <h2 className="text-2xl font-bold text-[#1a1a2e] mb-2">Something went wrong!</h2>
            <p className="text-[#6b7280] mb-6">A critical error occurred. Please try again.</p>
            <button
              onClick={() => reset()}
              className="px-4 py-2 bg-[#00A36C] text-white rounded-lg hover:bg-[#008F5E] transition-colors text-sm font-medium"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
