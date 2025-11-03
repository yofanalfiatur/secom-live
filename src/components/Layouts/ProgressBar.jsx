"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import "@/app/globals.css"; // pastikan path sesuai

export default function ProgressBar() {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.start();
    NProgress.set(0.3); // optional, start from 30%
    NProgress.inc(); // optional, small increment

    const timer = setTimeout(() => {
      NProgress.done();
    }, 300); // simulasikan waktu loading

    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [pathname]);

  return null;
}
