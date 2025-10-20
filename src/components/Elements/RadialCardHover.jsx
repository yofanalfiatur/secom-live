"use client";
import { useState, useRef, useEffect } from "react";

const RadialCardHover = ({
  className = "",
  dotSize = "1px",
  spacing = "15px",
  opacity = 0.15,
  hoverRadius = 25, // radius 25px = diameter 50px
}) => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseEnter = (e) => {
    setIsHovering(true);
    handleMouseMove(e);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setMousePosition({ x: -100, y: -100 });
  };

  // Convert spacing string ke number
  const spacingNum = parseInt(spacing.replace("px", ""));
  const dotSizeNum = parseInt(dotSize.replace("px", ""));

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full rounded-[0%] overflow-hidden z-0 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: "default" }}
    >
      {/* Base layer - dots dengan warna default */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, #132233 ${dotSize}, transparent ${dotSize})`,
          backgroundSize: `${spacing} ${spacing}`,
          backgroundPosition: "0 0",
          opacity: opacity,
        }}
      />

      {/* Layer 1 - Core hover area (intensitas penuh) - area kecil */}
      {isHovering && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-200 ease-out"
          style={{
            backgroundImage: `radial-gradient(circle, #00D4FF ${dotSize}, transparent ${dotSize})`,
            backgroundSize: `${spacing} ${spacing}`,
            backgroundPosition: "0 0",
            opacity: opacity * 0.9,
            WebkitMask: `radial-gradient(circle ${hoverRadius * 0.3}px at ${
              mousePosition.x
            }px ${mousePosition.y}px, black 100%, transparent 100%)`,
            mask: `radial-gradient(circle ${hoverRadius * 0.3}px at ${
              mousePosition.x
            }px ${mousePosition.y}px, black 100%, transparent 100%)`,
          }}
        />
      )}

      {/* Layer 2 - Medium blend area - area diperbesar */}
      {isHovering && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-250 ease-out"
          style={{
            backgroundImage: `radial-gradient(circle, #00D4FF ${dotSize}, transparent ${dotSize})`,
            backgroundSize: `${spacing} ${spacing}`,
            backgroundPosition: "0 0",
            opacity: opacity * 0.8,
            WebkitMask: `radial-gradient(circle ${hoverRadius * 0.7}px at ${
              mousePosition.x
            }px ${
              mousePosition.y
            }px, black 0%, black 50%, rgba(0,0,0,0.8) 75%, rgba(0,0,0,0.5) 90%, transparent 100%)`,
            mask: `radial-gradient(circle ${hoverRadius * 0.7}px at ${
              mousePosition.x
            }px ${
              mousePosition.y
            }px, black 0%, black 50%, rgba(0,0,0,0.8) 75%, rgba(0,0,0,0.5) 90%, transparent 100%)`,
          }}
        />
      )}

      {/* Layer 3 - Outer soft blend area - area diperbesar */}
      {isHovering && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 ease-out"
          style={{
            backgroundImage: `radial-gradient(circle, #00D4FF ${dotSize}, transparent ${dotSize})`,
            backgroundSize: `${spacing} ${spacing}`,
            backgroundPosition: "0 0",
            opacity: opacity * 0.6,
            WebkitMask: `radial-gradient(circle ${hoverRadius * 1.1}px at ${
              mousePosition.x
            }px ${
              mousePosition.y
            }px, black 0%, black 30%, rgba(0,0,0,0.7) 55%, rgba(0,0,0,0.4) 75%, rgba(0,0,0,0.2) 90%, transparent 100%)`,
            mask: `radial-gradient(circle ${hoverRadius * 1.1}px at ${
              mousePosition.x
            }px ${
              mousePosition.y
            }px, black 0%, black 30%, rgba(0,0,0,0.7) 55%, rgba(0,0,0,0.4) 75%, rgba(0,0,0,0.2) 90%, transparent 100%)`,
          }}
        />
      )}

      {/* Layer 4 - Feather edge untuk transisi yang sangat halus - area diperbesar */}
      {isHovering && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-400 ease-out"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(0, 212, 255, 0.6) ${dotSize}, transparent ${dotSize})`,
            backgroundSize: `${spacing} ${spacing}`,
            backgroundPosition: "0 0",
            opacity: opacity * 0.35,
            WebkitMask: `radial-gradient(circle ${hoverRadius * 1.5}px at ${
              mousePosition.x
            }px ${
              mousePosition.y
            }px, transparent 0%, transparent 55%, rgba(0,0,0,0.1) 65%, rgba(0,0,0,0.3) 75%, rgba(0,0,0,0.5) 85%, rgba(0,0,0,0.3) 93%, rgba(0,0,0,0.1) 97%, transparent 100%)`,
            mask: `radial-gradient(circle ${hoverRadius * 1.5}px at ${
              mousePosition.x
            }px ${
              mousePosition.y
            }px, transparent 0%, transparent 55%, rgba(0,0,0,0.1) 65%, rgba(0,0,0,0.3) 75%, rgba(0,0,0,0.5) 85%, rgba(0,0,0,0.3) 93%, rgba(0,0,0,0.1) 97%, transparent 100%)`,
          }}
        />
      )}

      {/* Layer 5 - Glow effect untuk enhancement - area diperbesar */}
      {isHovering && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500 ease-out"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(0, 212, 255, 0.3) ${dotSize}, transparent ${dotSize})`,
            backgroundSize: `${spacing} ${spacing}`,
            backgroundPosition: "0 0",
            opacity: opacity * 0.25,
            WebkitMask: `radial-gradient(circle ${hoverRadius * 1.8}px at ${
              mousePosition.x
            }px ${
              mousePosition.y
            }px, transparent 0%, transparent 65%, rgba(0,0,0,0.05) 70%, rgba(0,0,0,0.15) 80%, rgba(0,0,0,0.3) 88%, rgba(0,0,0,0.2) 94%, rgba(0,0,0,0.08) 98%, transparent 100%)`,
            mask: `radial-gradient(circle ${hoverRadius * 1.8}px at ${
              mousePosition.x
            }px ${
              mousePosition.y
            }px, transparent 0%, transparent 65%, rgba(0,0,0,0.05) 70%, rgba(0,0,0,0.15) 80%, rgba(0,0,0,0.3) 88%, rgba(0,0,0,0.2) 94%, rgba(0,0,0,0.08) 98%, transparent 100%)`,
          }}
        />
      )}
    </div>
  );
};

export default RadialCardHover;
