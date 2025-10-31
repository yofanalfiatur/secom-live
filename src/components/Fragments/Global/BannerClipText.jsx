"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import useIsDesktop from "@/components/Hooks/useIsDesktop";
import Image from "next/image";

const BannerClipText = ({ dataSection }) => {
  const isDesktop = useIsDesktop();
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState("auto");
  const textRefs = useRef([]);

  // Pisahkan teks menjadi parts (teks biasa, <b>...</b>, dan <br>)
  const parts = dataSection.title
    .split(/(<b>.*?<\/b>|<br\s*\/?>)/g)
    .filter(Boolean);

  // Ambil isi dari setiap <b> untuk animasi
  const boldParts = Array.from(
    dataSection.title.matchAll(/<b>(.*?)<\/b>/g)
  ).map((m) => m[1]);

  // Update container width ketika activeIndex berubah
  useEffect(() => {
    if (!boldParts.length || !textRefs.current[activeIndex]) return;

    const currentTextWidth = textRefs.current[activeIndex].offsetWidth;
    setContainerWidth(currentTextWidth);
  }, [activeIndex, boldParts.length]);

  // Interval untuk ganti teks bold
  useEffect(() => {
    if (!boldParts.length) return;

    // Set initial width
    if (textRefs.current[0]) {
      setContainerWidth(textRefs.current[0].offsetWidth);
    }

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % boldParts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [boldParts.length]);

  const textVariants = {
    enter: {
      y: "100%",
      opacity: 0,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
    center: {
      y: "0%",
      opacity: 1,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
    exit: {
      y: "-100%",
      opacity: 0,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  const containerVariants = {
    animate: {
      width: containerWidth,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        delay: 0.1,
      },
    },
  };

  const underlineVariants = {
    initial: { width: 0 },
    animate: {
      width: "100%",
      transition: { duration: 1, ease: "easeInOut" },
    },
    exit: { width: 0, transition: { duration: 1 } },
  };

  // Pre-render all text for measurement length text
  const renderAllTexts = () => {
    return boldParts.map((text, index) => (
      <span
        key={index}
        ref={(el) => (textRefs.current[index] = el)}
        className="inline-block text-white absolute top-0 left-0 opacity-0 pointer-events-none"
        style={{ whiteSpace: "nowrap" }}
      >
        {text}
      </span>
    ));
  };

  // unify parts
  const rendered = [];
  let boldIndex = -1;

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];

    if (part.startsWith("<b>")) {
      boldIndex++;
      let j = i;
      while (j < parts.length && parts[j].startsWith("<b>")) j++;

      rendered.push(
        <span
          key={`bold-run-${i}`}
          className="inline-block relative overflow-hidden align-bottom lg:mb-[-3px]"
          style={{ height: isDesktop ? "68px" : "45px" }}
        >
          {/* Hidden texts for measurement width */}
          <div className="absolute top-0 left-0 opacity-0">
            {renderAllTexts()}
          </div>

          {/* animated container */}
          <motion.span
            className="inline-block relative"
            variants={containerVariants}
            animate="animate"
            style={{ width: containerWidth }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={activeIndex}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="inline-block text-white relative"
                style={{ whiteSpace: "nowrap" }}
              >
                {boldParts[activeIndex]}
              </motion.span>
            </AnimatePresence>
          </motion.span>

          {/* underline animation */}
          <motion.span
            className="absolute left-0 bottom-0 h-[4px] bg-[#00aaad] z-10"
            variants={underlineVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          />
        </span>
      );

      i = j - 1;
    } else if (part.match(/<br\s*\/?>/i)) {
      // Handle <br> tag dengan benar
      rendered.push(<br key={`br-${i}`} />);
    } else {
      // Handle teks biasa, bersihkan dari tag HTML
      const cleanText = part.replace(/<\/?[^>]+(>|$)/g, "");
      if (cleanText.trim() !== "") {
        rendered.push(<span key={`text-${i}`}>{cleanText}</span>);
      }
    }
  }

  return (
    <section
      className={`flex-col flex justify-end lg:justify-center py-6 h-[480px] sm:h-[408px] bg-no-repeat bg-center lg:bg-right bg-cover lg:bg-inherit overflow-hidden relative after:content-[''] after:absolute after:top-0 after:left-0 after:z-[1] after:w-full after:h-full after:bg-[linear-gradient(0deg,_#00529C_30%,_rgba(0,82,156,0)_60.4%)] after:lg:bg-[linear-gradient(90deg,_#00529C_38%,_rgba(0,82,156,0)_75%)] am-banner`}
    >
      <picture>
        <source
          media="(min-width: 1024px)"
          srcSet={`${process.env.NEXT_PUBLIC_STORAGE_URL}${dataSection.image}`}
        />
        <Image
          src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${dataSection.imageMd}`}
          alt="Banner background"
          width={1200}
          height={900}
          quality={100}
          className="object-cover absolute top-0 right-0 w-full lg:w-[65%] h-full"
        />
      </picture>

      <div className="container mx-auto relative z-[2] flex flex-col">
        <h1 className="am-banner__title text-white font-raleway text-3xl lg:text-[50px] font-medium leading-[1.5] lg:leading-[1.3] mb-4 lg:mb-6 w-full">
          {rendered}
        </h1>
      </div>
    </section>
  );
};

export default BannerClipText;
