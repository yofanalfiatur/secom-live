"use client";
import useIsDesktop from "@/components/Hooks/useIsDesktop";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Image from "next/image";
import React from "react";
import BackgroundDots from "@/components/Elements/BackgroundDots";

const CareerCard = ({ dataSection }) => {
  const cards = dataSection.cards || [];
  const isDesktop = useIsDesktop();

  const staticIcon = "/img/icon-card-career.svg";

  const CardItem = ({ item, index }) => (
    <div className="flex flex-col cr-card__item" key={index}>
      {item.image && (
        <div className="flex flex-col aspect-[420/281] cr-card__image">
          <Image
            src={process.env.NEXT_PUBLIC_STORAGE_URL + item.image}
            alt="image"
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      {item.text && item.text !== "" && (
        <div className="flex flex-col border-[1px] aspect-[420/281] w-full h-full border-[#00000033] transition-all duration-200 ease hover:border-transparent relative p-1 group cr-card__title-icon">
          <div className="flex flex-col justify-end bg-white h-full relative z-[1] px-6 pt-8 pb-6">
            <p className="text-darkblue text-xl lg:text-[25px] font-medium font-raleway mb-2">
              {item.text}
            </p>
          </div>
          <div className="absolute top-0 left-0 w-full h-full z-0 bg-white transition-all duration-200 ease opacity-100 group-hover:opacity-0"></div>
          <div className="absolute top-0 left-0 w-full h-full z-0 animated-gradient-bg2 transition-all duration-200 ease opacity-0 group-hover:opacity-100"></div>
        </div>
      )}
    </div>
  );

  return (
    <section className="flex flex-col pt-7 lg:pt-25 pb-15 lg:pb-25 relative cr-card">
      <BackgroundDots
        dotSize={isDesktop ? 2.5 : 2}
        dotsX={isDesktop ? 35 : 25}
        dotsY={isDesktop ? 30 : 25}
      />
      <div className="container mx-auto flex flex-col relative z-[1]">
        {isDesktop ? (
          <div className="grid grid-cols-3 gap-y-3 gap-x-5">
            {cards.slice(0, 3).map((item, index) => (
              <CardItem key={index} item={item} index={index} />
            ))}
            {cards[3] && <CardItem item={cards[3]} index={3} />}
            <div className="flex flex-col justify-center cards-center text-center p-4">
              <h2 className="text-navyblue text-xl lg:text-[40px] leading-[1.3] font-semibold font-raleway">
                {dataSection.title_section}
              </h2>
            </div>
            {cards[4] && <CardItem item={cards[4]} index={4} />}
            {cards.slice(5, 100).map((item, index) => (
              <CardItem key={index + 5} item={item} index={index + 5} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col">
            <h2 className="text-navyblue text-[25px] font-medium leading-[1.3] mb-4 text-center">
              {dataSection.title_section}
            </h2>

            <div className="cr-card__wrap-slider">
              <Splide
                options={{
                  type: "loop",
                  perPage: 1,
                  autoplay: false,
                  pauseOnHover: true,
                  gap: "20px",
                  arrows: false,
                  pagination: true,
                }}
                hasTrack={false}
                className="[&_.splide__track]:!overflow-visible w-full slider-with-pagin"
              >
                <SplideTrack>
                  {cards.map((item, index) => (
                    <SplideSlide key={index}>
                      {item.image && (
                        <div className="flex flex-col">
                          <Image
                            src={
                              process.env.NEXT_PUBLIC_STORAGE_URL + item.image
                            }
                            alt="image"
                            width={500}
                            height={500}
                            className="w-full h-full aspect-[285/191] object-cover"
                          />
                        </div>
                      )}
                      {item.text && item.text !== "" && (
                        <div className="flex flex-col w-full h-full">
                          <div className="flex flex-col justify-end bg-white h-full relative z-[1] px-6 pt-8 pb-6 border-[1px] border-[#00000033]">
                            <p className="text-darkblue text-xl lg:text-[25px] font-medium font-raleway mb-2">
                              {item.text}
                            </p>
                          </div>
                        </div>
                      )}
                    </SplideSlide>
                  ))}
                </SplideTrack>
              </Splide>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CareerCard;
