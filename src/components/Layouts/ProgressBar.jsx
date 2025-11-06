"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import "@/app/globals.css";

export default function ProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Configure NProgress
    NProgress.configure({
      minimum: 0.1,
      easing: "ease",
      speed: 500,
      showSpinner: false,
    });

    // Handle link clicks
    const handleAnchorClick = (event) => {
      const target = event.currentTarget;

      // Skip for special cases
      if (
        target.target === "_blank" ||
        target.hasAttribute("download") ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey
      ) {
        return;
      }

      const href = target.getAttribute("href");
      const isInternalLink = href && href.startsWith("/");
      const isSamePage = href === pathname;

      if (isInternalLink && !isSamePage) {
        NProgress.start();

        // Add small delay for better UX
        setTimeout(() => {
          if (NProgress.status !== null && NProgress.status < 0.9) {
            NProgress.set(0.9);
          }
        }, 100);
      }
    };

    // Add click listeners to all links
    const setupLinkListeners = () => {
      const links = document.querySelectorAll('a[href^="/"]');
      links.forEach((link) => {
        link.addEventListener("click", handleAnchorClick);
      });
    };

    // Setup initial listeners
    setupLinkListeners();

    // Watch for new links added to DOM
    const observer = new MutationObserver(() => {
      setupLinkListeners();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Complete progress when route changes
    const completeProgress = () => {
      if (NProgress.status !== null) {
        NProgress.done();
      }
    };

    // Complete on route change
    completeProgress();

    // Fallback timeout
    const fallbackTimer = setTimeout(() => {
      completeProgress();
    }, 5000);

    return () => {
      observer.disconnect();
      const links = document.querySelectorAll('a[href^="/"]');
      links.forEach((link) => {
        link.removeEventListener("click", handleAnchorClick);
      });
      clearTimeout(fallbackTimer);
      completeProgress();
    };
  }, [pathname, searchParams]);

  return null;
}
