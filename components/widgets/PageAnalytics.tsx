"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { logPageView } from "@/services/analytics.service";

const REF_KEY = "ref";

function PageAnalyticsInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Read ?ref= param on the URL
    const refParam = searchParams.get(REF_KEY);

    if (refParam) {
      try {
        localStorage.setItem(REF_KEY, refParam);
      } catch (error) {
        console.error("Unable to access localStorage", error);
      }
    }

    // Retrieve stored ref, if any
    let storedRef: string | null = null;
    try {
      storedRef = localStorage.getItem(REF_KEY);
    } catch {}

    // Fire the analytics log (server action)
    logPageView({ pathname, ref: storedRef });
  }, [pathname, searchParams]);

  // This component does not render anything visible
  return null;
}

export default function PageAnalytics() {
  return (
    <Suspense fallback={null}>
      <PageAnalyticsInner />
    </Suspense>
  );
}
