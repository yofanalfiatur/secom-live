"use client";

import { useEffect, useState } from "react";
import ButtonSecondary from "@/components/Elements/ButtonSecondary";

const FooterTop = ({ prefooterData }) => {
  const [shouldHide, setShouldHide] = useState(false);

  useEffect(() => {
    // Simple client-side detection
    const hasHideFooterTop =
      document.querySelector(".hide__footer__top") !== null;
    setShouldHide(hasHideFooterTop);
  }, []);

  if (shouldHide) return null;
  return (
    <>
      <section className="relative z-10 flex flex-col border-b-1 border-[#ffffff66] w-full footer__top">
        <div className="relative z-[1] container w-full mx-auto">
          <div className="w-[90%] lg:w-3/4 border-r-1 py-3 lg:pt-19 lg:pb-19 border-[#ffffff66] flex flex-col">
            <h2 className="text-white text-[25px] lg:text-[60px] pr-4 lg:pl-0 py-3">
              {prefooterData.title}
            </h2>
          </div>
          <div className="w-[10%] lg:w-1/4"></div>
        </div>
      </section>

      <section className="relative z-10 flex flex-col w-full footer__cta">
        <div className="container relative z-[1] w-full mx-auto flex flex-row">
          <div className="w-[15%] lg:w-1/4"></div>
          <div className="w-[85%] lg:w-3/4 flex flex-col gap-y-8 lg:gap-y-6 border-[#ffffff66] border-l-1 pl-8 py-6 lg:pl-26 lg:pt-21 lg:pb-21">
            <p className="text-white text-[13px] lg:text-lg lg:text-[25px]">
              {prefooterData.description}
            </p>
            <ButtonSecondary href={prefooterData.buttonLink} target="_self">
              {prefooterData.buttonText}
            </ButtonSecondary>
          </div>
        </div>
      </section>
    </>
  );
};

export default FooterTop;
