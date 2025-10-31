"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";

const AbWorldCard = ({ dataSection }) => {
  return (
    <section className="pb-10 lg:pb-22 abw-card">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
        {dataSection.cards.map((item, index) => (
          <div className="flex flex-col relative group" key={index}>
            <Link
              href={item.url}
              target="_blank"
              className={`flex flex-col items-center pt-6 lg:pt-8 pb-5 lg:pb-16 px-8 gap-4 lg:gap-8 justify-between transition-all duration-300 ease abw-card__item m-1 h-full relative z-10 ${
                index === 0 ? "bg-navyblue" : "bg-tosca "
              }`}
            >
              <h3 className="text-white text-lg lg:text-[30px] text-center lg:w-[80%] mb-3">
                {item.title}
              </h3>
              <Image
                src={process.env.NEXT_PUBLIC_STORAGE_URL + item.image}
                width={1000}
                height={250}
                alt={item.title}
                className="w-full h-full aspect-[16/9] lg:max-h-[180px] object-contain"
              />
            </Link>
            <div
              className={`absolute top-0 left-0 w-full h-full z-0 transition-all duration-200 ease opacity-100 group-hover:opacity-0 ${
                index === 0 ? "bg-navyblue" : "bg-tosca "
              }`}
            ></div>
            <div className="absolute top-0 left-0 w-full h-full z-0 animated-gradient-bg2 transition-all duration-200 ease opacity-0 group-hover:opacity-100"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AbWorldCard;
