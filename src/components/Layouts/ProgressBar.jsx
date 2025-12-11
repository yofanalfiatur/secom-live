"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function ProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const NProgressRef = useRef(null);
  const fallbackTimerRef = useRef(null);

  // Initialize NProgress once
  useEffect(() => {
    (async () => {
      try {
        const NProgress = (await import("nprogress")).default;
        NProgress.configure({
          minimum: 0.1,
          easing: "ease",
          speed: 500,
          showSpinner: false,
        });
        NProgressRef.current = NProgress;
      } catch (e) {
        console.error("Failed to load NProgress:", e);
      }
    })();
  }, []);

  // Complete progress when route changes (pathname/searchParams update)
  useEffect(() => {
    const NProgress = NProgressRef.current;
    if (NProgress && NProgress.status !== null && NProgress.status > 0) {
      // If a progress was in flight, complete it now
      NProgress.done();
    }

    // Clean up any pending timers
    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current);
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    const NProgress = NProgressRef.current;
    if (!NProgress) return;

    const startProgress = () => {
      if (NProgress) {
        NProgress.start();
        setTimeout(() => {
          if (
            NProgress &&
            NProgress.status !== null &&
            NProgress.status < 0.4
          ) {
            NProgress.set(0.4);
          }
        }, 100);
      }
    };

    const completeProgress = () => {
      if (NProgress && NProgress.status !== null) {
        NProgress.done();
      }
    };

    // Single delegated click handler
    const onDocumentClick = (e) => {
      const anchor =
        e.target && e.target.closest && e.target.closest('a[href^="/"]');

      if (anchor) {
        // Ignore new tab, downloads, and modified clicks
        if (
          anchor.target === "_blank" ||
          anchor.hasAttribute("download") ||
          e.ctrlKey ||
          e.metaKey ||
          e.shiftKey
        ) {
          return;
        }

        // Only start if navigating to different page
        if (anchor.getAttribute("href") !== pathname) {
          startProgress();
        }
      }
    };

    // Attach listeners
    document.addEventListener("click", onDocumentClick, true);

    // Set fallback timeout to force completion (safeguard for slow pages)
    fallbackTimerRef.current = setTimeout(completeProgress, 4000);

    return () => {
      document.removeEventListener("click", onDocumentClick, true);
      if (fallbackTimerRef.current) {
        clearTimeout(fallbackTimerRef.current);
      }
    };
  }, [pathname]);

  return null;
}
