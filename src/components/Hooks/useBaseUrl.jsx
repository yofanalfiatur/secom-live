import { useMemo } from "react";

export const useBaseUrl = () => {
  return useMemo(() => {
    // Client-side
    if (typeof window !== "undefined") {
      return window.location.origin;
    }
    // Server-side fallback
    return process.env.NEXT_PUBLIC_BASE || "";
  }, []);
};
