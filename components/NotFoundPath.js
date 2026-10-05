"use client";

import { usePathname } from "next/navigation";

// The 404 route is a server component and Next does not hand it the requested
// path, so the client is the only place that knows it. Showing what the reader
// actually asked for is the single most useful thing on an error page: it turns
// "this is broken" into "this link is wrong".

export default function NotFoundPath() {
  const pathname = usePathname();

  if (!pathname || pathname === "/404") return null;

  return (
    <p className="nf-path">
      <span className="nf-path-label">Requested</span>
      <code className="nf-path-value">{pathname}</code>
    </p>
  );
}
