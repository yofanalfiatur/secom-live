"use client";

import dynamic from "next/dynamic";

// Lazy-load ProgressBar client-side only to avoid SSR bundle bloat
const ProgressBar = dynamic(() => import("./ProgressBar"), {
  ssr: false,
});

export default function ProgressBarWrapper() {
  return <ProgressBar />;
}
