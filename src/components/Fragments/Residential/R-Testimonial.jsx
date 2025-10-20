"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackgroundDots from "@/components/Elements/BackgroundDots";
import useIsDesktop from "@/components/Hooks/useIsDesktop";
import { useTranslations } from "next-intl";

const ResTesti = ({ dataSection }) => {
  const isDesktop = useIsDesktop();
  const [current, setCurrent] = useState(0);
  const testimonials = dataSection.cards;
  const total = testimonials.length;

  const next = () => {
    setCurrent((prev) => (prev + 1) % total);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + total) % total);
  };

  return (
    <section className="pt-8 lg:pt-16 pb-25 lg:pb-21 res-testi relative overflow-hidden before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-4/12 before:z-[1] before:bg-[linear-gradient(0deg,_#ffffff,_rgba(255,255,255,0)_60%)]">
      <BackgroundDots
        dotSize={isDesktop ? 2.5 : 2}
        dotsX={isDesktop ? 35 : 15}
        dotsY={isDesktop ? 25 : 35}
      />
      <div className="container mx-auto flex flex-col items-center">
        <h2 className="text-center text-[25px] lg:text-[45px] font-raleway font-normal text-darkblue">
          {dataSection.title_section}
        </h2>
        <p className="text-center text-sm lg:text-lg font-normal text-darkblue opacity-80 w-full lg:w-[60%] mt-3 mb-10 lg:mb-13">
          {dataSection.description_section}
        </p>

        {/* Stack Cards */}
        <div className="relative w-full lg:w-8/12 min-h-[380px] flex flex-col">
          <AnimatePresence initial={false} mode="popLayout">
            {testimonials.map((item, index) => {
              const position = (index - current + total) % total;
              if (position > 2) return null;
              const bgClass =
                position === 0
                  ? "animated-gradient-bg2"
                  : position === 1
                  ? "bg-navyblue"
                  : "bg-tosca";

              return (
                <motion.div
                  key={index}
                  className={`absolute w-full overflow-hidden ${
                    position === 0 ? "current-card" : ""
                  }`}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{
                    opacity: 1,
                    scale: 1 - position * 0.05,
                    y: (22 * position - 7) * -1,
                    zIndex: total - position,
                  }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="relative z-10 flex flex-col items-center wrap-testi">
                    <div
                      className={`flex flex-col items-center justify-center bg-white py-6 px-8 lg:py8 lg:px-20 relative z-[1] min-h-[376px] ${
                        position === 0 ? "m-1" : "m-[16px]"
                      } `}
                    >
                      <svg
                        width="60"
                        height="47"
                        viewBox="0 0 60 47"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="scale-75 lg:scale-100 lg:mt-4"
                      >
                        <path
                          d="M21.7337 0L17.6471 22.3113H25.0774V47H0V21.9455L6.6873 0H21.7337ZM56.6564 0L52.5697 22.3113H60V47H34.9226V21.9455L41.6099 0H56.6564Z"
                          fill="#00AAAD"
                        />
                      </svg>
                      <p
                        className={`text-darkblue text-center font-raleway font-normal mt-3 lg:mt-4 mb-3 lg:mb-4 transition-all duration-200 ease ${
                          position === 0
                            ? "lg:text-[25px] scale-100 visible opacity-100"
                            : "scale-0 hidden opacity-0"
                        }`}
                      >
                        {item.testimony}
                      </p>
                      <p className="text-tosca font-semibold mb-1 font-raleway lg:text-base text-sm">
                        {item.name}
                      </p>
                      <p className="text-darkblue text-sm lg:text-base">
                        {item.location}
                      </p>
                    </div>
                    <div
                      className={`absolute top-0 left-0 w-full h-full z-0 ${bgClass} transition-all duration-200 ease opacity-100`}
                    ></div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="absolute w-full z-[5] top-[calc(100%+50px)] lg:top-1/2 -translate-y-1/2 flex justify-between">
            <button
              onClick={prev}
              className="btn-prev border-tosca bg-white border w-[36px] h-[36px] flex items-center justify-center cursor-pointer relative left-[37%] lg:left-[-60px]"
            >
              <svg
                width="22"
                height="15"
                viewBox="0 0 22 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="scale-75 rotate-[270deg]"
              >
                <path
                  d="M21.3765 12.0804L10.9045 0L0.432595 12.0804C0.148111 12.4096 -0.00740039 12.8514 0.000270989 13.3085C0.00794236 13.7656 0.178168 14.2005 0.473501 14.5177C0.768834 14.8349 1.16508 15.0083 1.57507 14.9997C1.98507 14.9911 2.37522 14.8014 2.6597 14.4721L10.9045 4.95578L19.1585 14.4721C19.443 14.8014 19.8331 14.9911 20.2431 14.9997C20.6531 15.0083 21.0493 14.8349 21.3447 14.5177C21.64 14.2005 21.8102 13.7656 21.8179 13.3085C21.8256 12.8514 21.6701 12.4096 21.3856 12.0804H21.3765Z"
                  fill="#00AAAD"
                />
              </svg>
            </button>
            <button
              onClick={next}
              className="btn-next border-tosca bg-white border w-[36px] h-[36px] flex items-center justify-center cursor-pointer relative right-[37%] lg:right-[-60px]"
            >
              <svg
                width="22"
                height="15"
                viewBox="0 0 22 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="scale-75 rotate-[90deg]"
              >
                <path
                  d="M21.3765 12.0804L10.9045 0L0.432595 12.0804C0.148111 12.4096 -0.00740039 12.8514 0.000270989 13.3085C0.00794236 13.7656 0.178168 14.2005 0.473501 14.5177C0.768834 14.8349 1.16508 15.0083 1.57507 14.9997C1.98507 14.9911 2.37522 14.8014 2.6597 14.4721L10.9045 4.95578L19.1585 14.4721C19.443 14.8014 19.8331 14.9911 20.2431 14.9997C20.6531 15.0083 21.0493 14.8349 21.3447 14.5177C21.64 14.2005 21.8102 13.7656 21.8179 13.3085C21.8256 12.8514 21.6701 12.4096 21.3856 12.0804H21.3765Z"
                  fill="#00AAAD"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResTesti;
