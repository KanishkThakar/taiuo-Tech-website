"use client";

import Link from "next/link";
import { type ReactNode } from "react";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

/** next/link that fires one typed analytics event on click. */
export default function TrackedLink({
  href,
  event,
  className,
  children,
}: {
  href: string;
  event: AnalyticsEvent;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={className} onClick={() => trackEvent(event)}>
      {children}
    </Link>
  );
}
