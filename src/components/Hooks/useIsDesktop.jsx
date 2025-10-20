"use client";
import { useState, useCallback, useEffect } from "react";

/**
 * Custom hook to check if screen width is above a certain breakpoint.
 * Default: > 1023px = desktop
 * @param {number} breakpoint
 * @returns {boolean} true if desktop
 */
const useIsDesktop = (breakpoint = 1023) => {
  const [isDesktop, setIsDesktop] = useState(false);

  const handleMatch = useCallback((e) => {
    setIsDesktop(e.matches);
  }, []);

  useEffect(() => {
    const mediaQuery = `(min-width: ${breakpoint + 1}px)`;
    const media = window.matchMedia(mediaQuery);

    // Set initial value
    setIsDesktop(media.matches);

    // Add listener
    media.addEventListener("change", handleMatch);

    // Clean up
    return () => {
      media.removeEventListener("change", handleMatch);
    };
  }, [breakpoint, handleMatch]);

  return isDesktop;
};

export default useIsDesktop;
