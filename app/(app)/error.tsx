"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";

/**
 * Route-segment error boundary for the authenticated app. Renders inside the
 * app shell, so nav stays usable while the failed segment offers a retry.
 * Next 16 passes `unstable_retry` (re-fetches + re-renders the segment).
 */
export default function AppError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    // surface to the console (and any attached reporter) without leaking to UI
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto grid max-w-md place-items-center gap-4 py-24 text-center">
      <span className="grid h-12 w-12 place-items-center rounded-full bg-surface-2 text-body">
        <RotateCcw className="h-6 w-6" strokeWidth={1.75} />
      </span>
      <h2 className="text-xl font-semibold text-ink">Something went wrong</h2>
      <p className="text-[15px] text-body">
        This section hit an unexpected error. Trying again usually clears it.
      </p>
      <button onClick={() => unstable_retry()} className="btn btn-dark mt-1 gap-2">
        <RotateCcw className="h-4 w-4" strokeWidth={2} /> Try again
      </button>
    </div>
  );
}
