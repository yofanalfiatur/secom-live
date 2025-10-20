// components/RadialGrid.jsx
"use client";

import { useEffect } from "react";

const RadialGrid = () => {
  useEffect(() => {
    const grid = document.querySelector(".radial-grid");
    const handleMouseMove = (e) => {
      const mx = (e.clientX / window.innerWidth) * 100 + "%";
      const my = (e.clientY / window.innerHeight) * 100 + "%";
      grid?.style.setProperty("--mx", mx);
      grid?.style.setProperty("--my", my);
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return <div className="radial-grid w-full h-full absolute inset-0 -z-10" />;
};

export default RadialGrid;
