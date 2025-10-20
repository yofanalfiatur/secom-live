"use client";

import { useEffect } from "react";

const BackgroundDots = ({ dotSize = 5, dotsX = 25, dotsY = 20 }) => {
  useEffect(() => {
    const dot_color = "#01F3FF33";
    const dot_hl_color = "#00469799";

    const updateGradient = (x, y) => {
      const container = document.querySelector(".dots-bg-container");
      if (container) {
        container.style.backgroundImage = `radial-gradient(circle at ${x}% ${y}%, ${dot_hl_color}, ${dot_color} 30%)`;
      }
    };

    const resizeSvg = () => {
      const container = document.querySelector(".dots-bg-container");
      const svgBg = document.querySelector(".dots-svg-bg");
      if (container && svgBg) {
        const w = container.offsetWidth;
        const h = container.offsetHeight;
        svgBg.setAttribute("width", w);
        svgBg.setAttribute("height", h);
      }
    };

    const drawDots = () => {
      const mask = document.querySelector("#dots-bg-mask");
      if (!mask) return;

      // Clear existing dots
      while (mask.children.length > 1) {
        mask.removeChild(mask.lastChild);
      }

      const svgNS = "http://www.w3.org/2000/svg";

      for (let i = 0; i < dotsX; i++) {
        for (let j = 0; j < dotsY; j++) {
          const circle = document.createElementNS(svgNS, "circle");
          circle.setAttributeNS(null, "cx", `${(i + 0.5) * (100 / dotsX)}%`);
          circle.setAttributeNS(null, "cy", `${(j + 0.5) * (100 / dotsY)}%`);
          circle.setAttributeNS(null, "r", dotSize);
          mask.appendChild(circle);
        }
      }
    };

    const handleMouseMove = (event) => {
      const mouseX = (event.clientX / window.innerWidth) * 100;
      const mouseY = (event.clientY / window.innerHeight) * 100;
      updateGradient(mouseX, mouseY);
    };

    // Render awal
    drawDots();
    resizeSvg();

    // Set efek hover default di tengah
    updateGradient(50, 50);

    window.addEventListener("resize", resizeSvg);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", resizeSvg);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [dotSize, dotsX, dotsY]);

  return (
    <div className="dots-bg-container">
      <svg className="dots-svg-bg w-full h-full">
        <defs>
          <mask id="dots-bg-mask">
            <rect id="mask-rect" className="w-full h-full" fill="white" />
          </mask>
        </defs>
        <rect
          fill="white"
          id="dots-bg-rect"
          width="100%"
          height="100%"
          mask="url(#dots-bg-mask)"
        />
      </svg>
    </div>
  );
};

export default BackgroundDots;
