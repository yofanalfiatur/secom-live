import React from "react";
import Image from "next/image";
import ButtonPrimary from "@/components/Elements/ButtonPrimary";
import { useTranslations } from "next-intl";

const ResPromotion = () => {
  const t = useTranslations();
  const RePromotion = t.raw("RePromotion");

  return (
    <section className="pb-13 lg:pb-24 res-prom" id="res-prom">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between">
        <div className="flex flex-col w-full lg:w-[55%]">
          <Image
            src={RePromotion.image}
            alt="Promotion Image"
            width={714}
            height={421}
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="flex flex-col w-full lg:w-[41%] justify-center lg:pr-16 pt-6 lg:pt-0">
          <p className="text-darkblue text-sm lg:text-xl tracking-[3px] font-raleway uppercase">
            {RePromotion.hint}
          </p>
          <h2 className="text-darkblue text-[25px] lg:text-[45px] font-raleway font-medium mt-1 lg:mt-4 mb-3 leading-[1.4] lg:leading-[1.2]">
            {RePromotion.title}
          </h2>
          <p className="text-sm lg:text-lg font-normal leading-[1.7] lg:leading-[1.5] text-darkblue">
            {RePromotion.desc}
          </p>
          <ButtonPrimary
            text={RePromotion.btnPromotion.text}
            href={RePromotion.btnPromotion.href}
            target={RePromotion.btnPromotion.target}
            className="mt-6 lg:!py-5"
          >
            {RePromotion.btnPromotion.text}
          </ButtonPrimary>
        </div>
      </div>
    </section>
  );
};

export default ResPromotion;
