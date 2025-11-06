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
          if (NProgress.status !== null && NProgress.status < 0.8) {
            NProgress.set(0.8);
          }
        }, 100);
      }
    };

    // Handle language switcher clicks (desktop)
    const handleLanguageSwitcherClick = (event) => {
      const target = event.currentTarget;

      // Check if the clicked element is a language option without .active class
      const isLangOption = target.closest(".lang-option");
      const isActiveLang = target.closest(".lang-option.active");

      if (isLangOption && !isActiveLang) {
        // Start progress bar for language change
        NProgress.start();

        // Add small delay for better UX
        setTimeout(() => {
          if (NProgress.status !== null && NProgress.status < 0.7) {
            NProgress.set(0.7);
          }
        }, 100);
      }
      // If it's an active language option, do nothing (no progress bar)
    };

    // Handle mobile language switcher clicks
    const handleMobileLanguageSwitcherClick = (event) => {
      const target = event.currentTarget;

      // Check if the clicked element is a mobile language button without .active-md class
      const isMobileLangButton = target.closest(".header__menu__link");
      const isActiveMobileLang = target.closest(
        ".header__menu__link.active-md"
      );

      if (isMobileLangButton && !isActiveMobileLang) {
        // Start progress bar for mobile language change
        NProgress.start();

        // Add small delay for better UX
        setTimeout(() => {
          if (NProgress.status !== null && NProgress.status < 0.7) {
            NProgress.set(0.7);
          }
        }, 100);
      }
      // If it's an active mobile language button, do nothing (no progress bar)
    };

    // Add click listeners to all links
    const setupLinkListeners = () => {
      const links = document.querySelectorAll('a[href^="/"]');
      links.forEach((link) => {
        link.removeEventListener("click", handleAnchorClick);
        link.addEventListener("click", handleAnchorClick);
      });
    };

    // Add click listeners to language switcher (desktop)
    const setupLanguageSwitcherListeners = () => {
      // Method 1: Listen to lang-list container (event delegation)
      const langLists = document.querySelectorAll("ul.lang-list");
      langLists.forEach((langList) => {
        langList.removeEventListener("click", handleLanguageSwitcherClick);
        langList.addEventListener("click", handleLanguageSwitcherClick);
      });

      // Method 2: Also listen to individual lang-option elements
      const langOptions = document.querySelectorAll("li.lang-option");
      langOptions.forEach((option) => {
        option.removeEventListener("click", handleLanguageSwitcherClick);
        option.addEventListener("click", handleLanguageSwitcherClick);
      });

      // Method 3: Listen to lang-link buttons directly
      const langLinks = document.querySelectorAll(".lang-link");
      langLinks.forEach((link) => {
        link.removeEventListener("click", handleLanguageSwitcherClick);
        link.addEventListener("click", handleLanguageSwitcherClick);
      });
    };

    // Add click listeners to mobile language switcher
    const setupMobileLanguageSwitcherListeners = () => {
      // Method 1: Listen to header__lang-md container (event delegation)
      const mobileLangContainers =
        document.querySelectorAll(".header__lang-md");
      mobileLangContainers.forEach((container) => {
        container.removeEventListener(
          "click",
          handleMobileLanguageSwitcherClick
        );
        container.addEventListener("click", handleMobileLanguageSwitcherClick);
      });

      // Method 2: Listen to individual mobile language buttons
      const mobileLangButtons = document.querySelectorAll(
        ".header__menu__link"
      );
      mobileLangButtons.forEach((button) => {
        button.removeEventListener("click", handleMobileLanguageSwitcherClick);
        button.addEventListener("click", handleMobileLanguageSwitcherClick);
      });
    };

    // Setup all listeners
    const setupAllListeners = () => {
      setupLinkListeners();
      setupLanguageSwitcherListeners();
      setupMobileLanguageSwitcherListeners();
    };

    // Setup initial listeners
    setupAllListeners();

    // Watch for new links added to DOM
    const observer = new MutationObserver(() => {
      setupAllListeners();
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

      // Cleanup all event listeners
      const links = document.querySelectorAll('a[href^="/"]');
      links.forEach((link) => {
        link.removeEventListener("click", handleAnchorClick);
      });

      const langLists = document.querySelectorAll("ul.lang-list");
      langLists.forEach((langList) => {
        langList.removeEventListener("click", handleLanguageSwitcherClick);
      });

      const langOptions = document.querySelectorAll("li.lang-option");
      langOptions.forEach((option) => {
        option.removeEventListener("click", handleLanguageSwitcherClick);
      });

      const langLinks = document.querySelectorAll(".lang-link");
      langLinks.forEach((link) => {
        link.removeEventListener("click", handleLanguageSwitcherClick);
      });

      const mobileLangContainers =
        document.querySelectorAll(".header__lang-md");
      mobileLangContainers.forEach((container) => {
        container.removeEventListener(
          "click",
          handleMobileLanguageSwitcherClick
        );
      });

      const mobileLangButtons = document.querySelectorAll(
        ".header__menu__link"
      );
      mobileLangButtons.forEach((button) => {
        button.removeEventListener("click", handleMobileLanguageSwitcherClick);
      });

      clearTimeout(fallbackTimer);
      completeProgress();
    };
  }, [pathname, searchParams]);

  return null;
}
