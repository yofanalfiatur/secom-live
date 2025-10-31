"use client";

import Image from "next/image";
import RadialCardHover from "@/components/Elements/RadialCardHover";
import RadialGridCard from "@/components/Elements/RadialGridCard";

const CardProduct = ({ item, variant = "desktop" }) => {
  if (variant === "desktop") {
    return (
      <li className="w-[32.5%] relative flex flex-col min-h-[500px] group">
        <div className="flex flex-col h-full bg-[#012146] pt-12 pb-6 px-8 m-1 relative z-[1] group card-product-desktop">
          <RadialCardHover
            dotSize="1px"
            spacing="11px"
            opacity={0.2}
            hoverRadius={300}
          />
          <div className="flex flex-col items-center  pointer-events-none relative !cursor-pointer z-10">
            <p className="text-white text-[25px] font-raleway text-center">
              {item.title}
            </p>
            <p className="text-white text-center mt-2 mb-10 w-[80%] min-h-[80px]">
              {item.desc}
            </p>
            <Image
              src={item.image}
              alt={item.title}
              width={216}
              height={216}
              className="transition-all duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full z-0 bg-[#012146] transition-all duration-200 ease opacity-100 group-hover:opacity-0"></div>
        <div className="absolute top-0 left-0 w-full h-full z-0 animated-gradient-bg2 transition-all duration-200 ease opacity-0 group-hover:opacity-100"></div>
      </li>
    );
  }

  // mobile variant
  return (
    <div className="relative flex flex-col group min-h-[350px] bg-[#012146] pt-7 pb-6 px-8 card-product-mobile">
      <RadialGridCard />
      <div className="flex flex-col h-full relative z-[1] group ">
        <div className="flex flex-col items-center relative z-10">
          <p className="text-white font-raleway text-center font-medium">
            {item.title}
          </p>
          <p className="text-white text-center mt-1 mb-8 w-[80%] text-sm">
            {item.desc}
          </p>
          <Image
            src={item.image}
            alt={item.title}
            width={147}
            height={147}
            className="group-hover:scale-110 transition-all duration-200 ease-in-out"
          />
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
