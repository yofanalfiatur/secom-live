"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import "@/app/globals.css";

export default function ProgressBar() {
  const pathname = usePathname();
  const progressStartedRef = useRef(false);

  useEffect(() => {
    const startProgress = () => {
      if (!progressStartedRef.current) {
        NProgress.start();
        NProgress.set(0.3);
        progressStartedRef.current = true;
      }
    };

    const doneProgress = () => {
      NProgress.done();
      progressStartedRef.current = false;
    };

    // 1. Deteksi klik pada semua link
    const handleLinkClick = (event) => {
      const target = event.currentTarget;

      if (
        target.href &&
        target.target !== "_blank" &&
        target.hostname === window.location.hostname
      ) {
        startProgress();

        // Fallback
        setTimeout(() => {
          if (progressStartedRef.current) {
            doneProgress();
          }
        }, 2000);
      }
    };

    // 2. OVERRIDE Router Push untuk deteksi navigasi programmatic
    const originalPush = window.next?.router?.push;
    if (originalPush) {
      window.next.router.push = function (...args) {
        startProgress();
        return originalPush.apply(this, args);
      };
    }

    // 3. Add click listeners to all links
    const addLinkListeners = () => {
      const anchors = document.querySelectorAll("a[href]");
      anchors.forEach((anchor) => {
        anchor.addEventListener("click", handleLinkClick);
      });
    };

    // Mutation Observer untuk link dinamis
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeName === "A" && node.href) {
              node.addEventListener("click", handleLinkClick);
            } else if (node.nodeType === 1) {
              const links = node.querySelectorAll("a[href]");
              links.forEach((link) => {
                link.addEventListener("click", handleLinkClick);
              });
            }
          });
        }
      });
    });

    // Start observing
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Initial setup
    addLinkListeners();

    // Handle route completion
    const timer = setTimeout(() => {
      doneProgress();
    }, 400);

    return () => {
      clearTimeout(timer);
      doneProgress();
      observer.disconnect();

      // Restore original push jika ada
      if (originalPush && window.next?.router) {
        window.next.router.push = originalPush;
      }

      // Remove all click listeners
      const anchors = document.querySelectorAll("a[href]");
      anchors.forEach((anchor) => {
        anchor.removeEventListener("click", handleLinkClick);
      });
    };
  }, [pathname]);

  return null;
}
