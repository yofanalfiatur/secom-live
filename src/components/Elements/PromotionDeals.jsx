import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
const PromotionDeals = () => {
  const t = useTranslations();
  const promoFloat = t.raw("promoFloat");

  return (
    <>
      <motion.div
        animate={{ y: "0%", opacity: 1 }}
        initial={{ y: "100%", opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="flex w-max flex-row items-center gap-4 fixed bottom-[30px] left-[20px] lg:left-1/2 transform lg:translate-x-[-50%] z-[100] bg-[#EAF5FF] opacity-100 py-2 lg:py-4 px-6 lg:px-8 shadow-[0px_4px_20px_0px_#0000001A]"
      >
        <div className="bg-[#A70000] flex flex-col rounded-full w-[35px] h-[35px] lg:w-[45px] lg:h-[45px] items-center justify-center">
          <svg
            width="23"
            height="23"
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[18px] h-[18px] lg:w-[23px] lg:h-[23px]"
          >
            <path
              d="M12.1581 2.15745C11.7831 1.78233 11.2745 1.57152 10.744 1.57141H3.57155C3.04108 1.57141 2.53234 1.78214 2.15724 2.15724C1.78214 2.53234 1.57141 3.04108 1.57141 3.57155V10.744C1.57152 11.2745 1.78233 11.7831 2.15745 12.1581L10.8621 20.8628C11.3166 21.3144 11.9314 21.5679 12.5722 21.5679C13.213 21.5679 13.8277 21.3144 14.2823 20.8628L20.8628 14.2823C21.3144 13.8277 21.5679 13.213 21.5679 12.5722C21.5679 11.9314 21.3144 11.3166 20.8628 10.8621L12.1581 2.15745Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.07181 7.57185C7.34797 7.57185 7.57185 7.34797 7.57185 7.07181C7.57185 6.79565 7.34797 6.57178 7.07181 6.57178C6.79565 6.57178 6.57178 6.79565 6.57178 7.07181C6.57178 7.34797 6.79565 7.57185 7.07181 7.57185Z"
              fill="white"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="flex-col hidden lg:flex">
          <p className="font-semibold text-navyblue text-[22px] font-raleway lg:pr-8">
            {promoFloat.text}
          </p>
        </div>
        <div className="flex flex-col">
          <Link
            href={promoFloat.btn.href}
            target={promoFloat.btn.target}
            className="border-tosca text-tosca hover:bg-tosca hover:text-white transition-all duration-300 ease border-[1px] bg-transparent py-[5px] lg:py-2 px-3 lg:px-4 text-[11px] lg:text-sm tracking-[3px] uppercase rounded-[5px]"
          >
            {promoFloat.btn.text}
          </Link>
        </div>
      </motion.div>
    </>
  );
};

export default PromotionDeals;
