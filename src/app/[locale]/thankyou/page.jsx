"use client";
import ButtonPrimary from "@/components/Elements/ButtonPrimary";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import FloatButton from "@/components/Elements/FloatButton";

const ThankYou = () => {
  const t = useTranslations();
  const ThankYouPage = t.raw("ThankYouPage");

  return (
    <>
      <section className="ty-page hide__footer__top">
        <div className="container mx-auto flex flex-row">
          <div className="w-full lg:w-2/3 border-r-0 lg:border-r-[1px] pt-13 pb-13 lg:pt-20 lg:pb-26 lg:border-[#13223322]">
            <h1 className="text-[33px] lg:text-[65px] font-open-sans font-semibold relative max-w-full leading-[1.1]">
              <span className="relative">
                {ThankYouPage.title}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="300"
                  height="51"
                  viewBox="0 0 300 51"
                  fill="none"
                  className="absolute top-0 lg:top-[17px] right-[-65%] lg:right-[-100%] object-contain w-[105px] lg:w-[300px]"
                >
                  <motion.line
                    animate={{ x: "0%", opacity: 1 }}
                    initial={{ x: "-100%", opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    y1="48.5"
                    x2="212"
                    y2="48.5"
                    stroke="#00AAAD"
                    strokeWidth="5"
                  />
                  <motion.line
                    animate={{ x: "0%", opacity: 1 }}
                    initial={{ x: "-100%", opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    x1="48"
                    y1="25.5"
                    x2="212"
                    y2="25.5"
                    stroke="#00AAAD"
                    strokeWidth="5"
                  />
                  <motion.line
                    animate={{ x: "0%", opacity: 1 }}
                    initial={{ x: "-100%", opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    x1="106"
                    y1="2.5"
                    x2="212"
                    y2="2.50001"
                    stroke="#00AAAD"
                    strokeWidth="5"
                  />
                  <motion.path
                    animate={{ x: "0%", opacity: 1 }}
                    initial={{ x: "-50%", opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    d="M236 0V51H300V0H236ZM265.44 30.4938C266.18 31.042 267.078 31.3381 268 31.3381C268.922 31.3381 269.82 31.042 270.56 30.4938L273.689 28.1562L295.733 44.625V46.75H240.267V44.625L262.311 28.1562L265.44 30.4938ZM268 27.0938L240.267 6.375V4.25H295.733V6.375L268 27.0938ZM240.267 11.6875L258.756 25.5L240.267 39.3125V11.6875ZM295.733 39.3125L277.244 25.5L295.733 11.6875V39.3125Z"
                    fill="#00AAAD"
                  />
                </svg>
              </span>
              <br />
              <span> {ThankYouPage.title2}</span>
            </h1>
          </div>
          <div className=" hidden lg:flex lg:w-1/3"></div>
        </div>
        <div className="bg-[#13223322] w-screen h-[1px]"></div>
        <div className="container mx-auto flex flex-row">
          <div className="hidden lg:flex lg:w-2/3 border-r-[1px] border-[#13223322]"></div>
          <div className="w-full lg:w-1/3 flex flex-col pt-11 pb-15 lg:pt-10 lg:pb-36 lg:pl-8">
            <p className="text-sm lg:text-lg text-darkblue w-full lg:w-[83%]">
              {ThankYouPage.desc}
            </p>
            <ButtonPrimary
              href={ThankYouPage.buttonCTA.href}
              target={ThankYouPage.buttonCTA.target}
              className="mt-6 lg:mt-5"
            >
              {ThankYouPage.buttonCTA.text}
            </ButtonPrimary>
          </div>
        </div>
      </section>
      <FloatButton />
    </>
  );
};

export default ThankYou;
