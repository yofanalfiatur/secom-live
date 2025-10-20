"use client";

import React, { useEffect, useRef } from "react";

export default function Starfield({
  speedFactor = 0.05,
  backgroundColor = "black",
  starColor = [255, 255, 255],
  starCount = 5000, // default dikurangi dari 10000 jadi 1500
}) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const makeStars = (count) =>
      Array.from({ length: count }, () => ({
        x: Math.random() * 1600 - 800,
        y: Math.random() * 900 - 450,
        z: Math.random() * 1000,
      }));

    let stars = makeStars(starCount);

    const clear = () => {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, w, h);
    };

    const putPixel = (x, y, brightness) => {
      ctx.fillStyle = `rgba(${starColor[0]},${starColor[1]},${starColor[2]},${brightness})`;
      ctx.fillRect(x, y, 1, 1);
    };

    const moveStars = (distance) => {
      stars.forEach((s) => {
        s.z -= distance;
        if (s.z <= 1) s.z += 1000;
      });
    };

    let prevTime = performance.now();

    const render = (time) => {
      const elapsed = time - prevTime;
      prevTime = time;

      moveStars(elapsed * speedFactor);
      clear();

      const cx = w / 2;
      const cy = h / 2;

      stars.forEach((star) => {
        const x = cx + star.x / (star.z * 0.001);
        const y = cy + star.y / (star.z * 0.001);

        if (x >= 0 && x < w && y >= 0 && y < h) {
          const d = star.z / 1000.0;
          const b = 1 - d * d;
          putPixel(x, y, b);
        }
      });

      animationRef.current = requestAnimationFrame(render);
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };

    window.addEventListener("resize", resize);

    // Intersection observer: hanya render jika terlihat
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          prevTime = performance.now();
          animationRef.current = requestAnimationFrame(render);
        } else {
          cancelAnimationFrame(animationRef.current);
        }
      },
      { threshold: 0.1 }
    );

    observerRef.current.observe(canvas);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      observerRef.current?.disconnect();
    };
  }, [starColor, backgroundColor, speedFactor, starCount]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 10,
        pointerEvents: "none",
        mixBlendMode: "screen",
        width: "100%",
        height: "100%",
      }}
    />
  );
}
