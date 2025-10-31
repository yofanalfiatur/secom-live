"use client";
import useIsDesktop from "@/components/Hooks/useIsDesktop";
import { useTranslations } from "next-intl";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const AmHowWorks = ({ dataSection }) => {
  // State untuk menyimpan opacity setiap card
  const [cardOpacities, setCardOpacities] = useState([]);

  return (
    <section className="am-how relative">
      {/* Background Sticky */}
      <div className="relative">
        {dataSection.items.map((item, index) => (
          <motion.div
            key={index}
            className="h-[calc(100vh)] w-screen bg-cover bg-center bg-no-repeat sticky top-[0px] am-how__bg-img"
            style={{
              backgroundImage: `url(${
                process.env.NEXT_PUBLIC_STORAGE_URL + item.image
              })`,
            }}
          />
        ))}
      </div>

      {/* Card Overlay */}
      <div className="absolute top-0 left-0 w-full h-full flex z-10 pointer-events-none am-how__wrap-card">
        <div className="container mx-auto pointer-events-auto flex flex-col items-end">
          <div className="w-5/12 flex flex-col gap-4">
            {dataSection.items.map((item, index) => {
              const cardRef = useRef(null);
              const [isSticky, setIsSticky] = useState(false);

              const { scrollYProgress } = useScroll({
                target: cardRef,
                offset: ["10% 50%", "start 94px"],
              });

              // Deteksi ketika card menjadi sticky
              useEffect(() => {
                const handleScroll = () => {
                  if (!cardRef.current) return;

                  const rect = cardRef.current.getBoundingClientRect();
                  // Card dianggap sticky ketika posisinya <= 94px
                  setIsSticky(rect.top <= 94);
                };

                window.addEventListener("scroll", handleScroll, {
                  passive: true,
                });
                return () => window.removeEventListener("scroll", handleScroll);
              }, []);

              // Ketika card sudah sticky, gunakan opacity 1 tanpa transform
              const opacity = useTransform(
                () => {
                  if (isSticky) return 1;
                  return scrollYProgress.get();
                },
                [0, 1],
                [0, 1]
              );

              const translateY = useTransform(
                scrollYProgress,
                [0, 1],
                ["20%", "0%"]
              );

              const scaleCard = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

              // Update opacity card ke state utama
              useEffect(() => {
                const updateOpacity = () => {
                  const currentOpacity = isSticky ? 1 : scrollYProgress.get();
                  setCardOpacities((prev) => {
                    const newOpacities = [...prev];
                    newOpacities[index] = currentOpacity;
                    return newOpacities;
                  });
                };

                // Update saat scroll atau sticky berubah
                updateOpacity();

                // Listen untuk perubahan scrollYProgress
                const unsubscribe = scrollYProgress.on("change", updateOpacity);
                return unsubscribe;
              }, [scrollYProgress, isSticky, index]);

              // Menentukan apakah card ini sudah mencapai opacity 1
              const hasReachedFullOpacity =
                (isSticky ? 1 : scrollYProgress.get()) >= 0.9;

              // Menentukan class untuk siblings
              const getCardClasses = () => {
                let classes =
                  "flex flex-col justify-center h-[calc(100vh)] sticky top-[94px] pb-[94px] am-how__card";

                // Jika ada card setelah ini yang sudah mencapai opacity 1, tambahkan card-backward
                for (let i = index + 1; i < cardOpacities.length; i++) {
                  if (cardOpacities[i] >= 0.9) {
                    classes += " card-backward";
                    break;
                  }
                }

                return classes;
              };

              return (
                <motion.div
                  ref={cardRef}
                  key={index}
                  className={getCardClasses()}
                  style={{
                    opacity,
                    y: isSticky ? 0 : translateY,
                    scale: isSticky ? 1 : scaleCard,
                  }}
                >
                  <div className="bg-navyblue py-10 px-7 lg:py-8 lg:px-10 flex flex-col justify-center shadow-lg h-[45vh] am-how__card__content">
                    <p className="text-[#ffffff99] uppercase text-sm lg:text-lg tracking-[2px] font-raleway mb-3 lg:mb-4">
                      {dataSection.title}
                    </p>
                    <p
                      className="text-[25px] lg:text-[45px] font-raleway font-normal text-white lg:leading-[1.1]"
                      dangerouslySetInnerHTML={{ __html: item.title }}
                    />
                    <p className="leading-[1.7] lg:leading-[1.5] lg:text-lg text-white opacity-80 mt-3">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full z-10 dots-pagination">
        <div className="container flex flex-col mx-auto sticky top-[0px] py-[50vh]">
          <div
            className={`w-full flex flex-col items-end justify-center pr-3 gap-1 min-h-[80px] absolute top-[52%] -translate-y-1/2`}
          >
            {dataSection.items.map((item, index) => {
              // Menentukan dot mana yang harus aktif berdasarkan card dengan opacity 1
              const getActiveDotIndex = () => {
                // Cari card terakhir yang memiliki opacity mendekati 1 (>= 0.9)
                let lastActiveIndex = -1;
                for (let i = 0; i < cardOpacities.length; i++) {
                  if (cardOpacities[i] >= 0.9) {
                    lastActiveIndex = i;
                  }
                }
                // Jika tidak ada yang aktif atau hanya card pertama yang aktif, aktifkan dot pertama
                return lastActiveIndex === -1 ? 0 : lastActiveIndex;
              };

              const activeDotIndex = getActiveDotIndex();
              const isActive = index === activeDotIndex;

              return (
                <button
                  key={index}
                  className={`w-[12px] h-[12px] rounded-full transition-colors duration-300 am-how__dot-item ${
                    isActive ? "bg-tosca" : "bg-white"
                  }`}
                ></button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AmHowWorks;
