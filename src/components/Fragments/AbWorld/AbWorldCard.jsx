"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";

const AbWorldCard = ({ dataSection }) => {
  return (
    <section className="pb-10 lg:pb-22 abw-card">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4">
        {dataSection.cards.map((item, index) => (
          <Link
            href={item.url}
            target="_blank"
            className={`flex flex-col items-center pt-6 lg:pt-8 pb-5 lg:pb-16 px-8 gap-4 justify-between transition-all duration-300 ease hover:shadow-lg hover:shadow-black/30 abw-card__item ${
              index === 0
                ? "bg-navyblue hover:bg-tosca"
                : "bg-tosca hover:bg-navyblue"
            }`}
            key={index}
          >
            <h3 className="text-white text-lg lg:text-[30px] text-center lg:w-[80%] mb-3">
              {item.title}
            </h3>
            <Image
              src={process.env.NEXT_PUBLIC_STORAGE_URL + item.image}
              width={1000}
              height={250}
              alt={item.title}
              className="w-full h-full aspect-[16/9] lg:max-h-[250px] object-contain"
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default AbWorldCard;
