"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";

const BlpCard = ({ dataSection }) => {
  return (
    <section className="flex pt-0 lg:pt-16 pb-10 lg:pb-28 flex-col blp-card">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-5">
        {dataSection.map((item, index) => (
          <Link
            href={index === 0 ? "/sector" : "solution"}
            className=" flex flex-col group"
            key={index}
          >
            <Image
              src={process.env.NEXT_PUBLIC_STORAGE_URL + item.image}
              width={1000}
              height={1000}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div
              className={`flex flex-col items-center pt-2 pb-2 lg:pt-5 lg:pb-6 px-6 w-full transition-all duration-300 ease ${
                index === 0
                  ? "bg-navyblue group-hover:bg-tosca"
                  : "bg-tosca group-hover:bg-navyblue"
              }`}
            >
              <p className="text-white leading-[1.3] lg:leading-[1.2] text-sm lg:text-[30px] mb-1 lg:mb-2">
                {item.title}
              </p>
              <p className="text-white leading-[1.3] lg:leading-[1.2] text-[10px] lg:text-lg">
                {item.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BlpCard;
